'use client';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, getDoc, runTransaction } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProfileAvatar from '@/components/ProfileAvatar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { toast } from 'sonner';
import { db } from '@/lib/firebase'; // Firebase import for adding data
import { userAtom } from '@/lib/atoms/userAtom'; // Import the userAtom

export default function ProfileViewer({
    doctor = {
        id: '12345',
        displayName: 'Dr. John Doe',
        avatarUrl: '/placeholder.svg?height=128&width=128',
        profile: {
            specialization: 'Cardiology',
            experience: '10 years',
            hospital: ['XYZ Hospital', 'ABC '],
            phone: '123-456-7890',
            email: 'johndoe@hospital.com',
            schedule: {
                Monday: { enabled: true, start: '08:05', end: '20:00' },
                Tuesday: { enabled: false },
            },
            address: '123 Health St, City, Country',
            city: 'City Name',
            profileImage: '/doctor-profile.jpg',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/profileImages%2FalzTVMGzxkhgcTjp32ZByI2X4Os1?alt=media&token=6db3db53-6acd-42f6-945a-a4a22d14dea6',
            specificPatientGroups: ['Old'],
            subspecialties: ['Gynecologist'],
            technologiesProficient: ['Chemo Therapy'],
            procedures: ['Regular', 'First Aid'],
        },
    }
}) {
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
    const [notes, setNotes] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);

    const generateTimeSlots = (start, end) => {
        const slots = [];
        let current = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);

        while (current < endTime) {
            const next = new Date(current.getTime() + 30 * 60000);
            slots.push(`${current.toTimeString().slice(0, 5)} - ${next.toTimeString().slice(0, 5)}`);
            current = next;
        }
        return slots;
    };

    const handleDateSelection = (date) => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",];
        const selectedDate = new Date(date);

        if (isNaN(selectedDate.getTime())) {
            toast.error("Invalid date selected. Please try again.");
            return;
        }

        const dayOfWeek = days[selectedDate.getDay()]; // Calculate the day of the week (Sunday-Saturday)
        const schedule = doctor.profile.schedule[dayOfWeek];

        if (schedule?.enabled) {
            const slots = generateTimeSlots(schedule.start, schedule.end); // Generate slots for that day
            setAvailableSlots(slots); // Set available slots
            setSelectedDate(date); // Save the selected date
            setSelectedSlot(""); // Reset selected slot
            toast.success(`Slots available for ${dayOfWeek}`);
        } else {
            toast.error(`No availability for ${dayOfWeek}. Please select another date.`);
            setAvailableSlots([]); // Clear slots if unavailable
        }
    };


    
    const [user] = useAtom(userAtom);
    const patientName = user?.displayName;

    const profileSections = [
        {
            title: 'Professional Information',
            items: [
                { label: 'Specialization', value: doctor.profile?.primarySpecialty },
                { label: 'Experience', value: doctor.profile?.yearsOfExperience },
                { label: 'Hospital', value: doctor.profile?.hospitalAffiliations },
                { label: 'Clinic', value: doctor.profile?.clinicName },
            ],
        },
        {
            title: 'Contact Information',
            items: [
                { label: 'Phone', value: doctor.profile?.phonenumber },
                { label: 'Email', value: doctor.email },
            ],
        },
        {
            title: 'Schedule and Location',
            items: [
                {
                    label: 'Schedule',
                    value: doctor.profile.schedule ? (
                        <ul>
                            {Object.entries(doctor.profile.schedule).map(([day, { enabled, start, end }]) =>
                                enabled ? (
                                    <li key={day}>
                                        {day}: {start} - {end}
                                    </li>
                                ) : null
                            )}
                        </ul>
                    ) : (
                        'N/A'
                    ),
                },
                { label: 'Address', value: doctor.profile?.address },
                { label: 'City', value: doctor.profile?.city },
            ],
        },
        {
            title: 'Specialties and Skills',
            items: [
                { label: 'Patient Groups', value: (doctor.profile?.specificPatientGroups || []).join(', ') },
                { label: 'Subspecialties', value: (doctor.profile?.subspecialties || []).join(', ') },
                { label: 'Technologies Proficient', value: (doctor.profile?.technologiesProficient || []).join(', ') },
                { label: 'Procedures', value: (doctor.profile?.procedures || []).join(', ') },
            ],
        },
    ];

    const handleBookAppointment = async () => {
        if (!selectedDate || !selectedSlot) {
            toast.error("Please select a day and a time slot.");
            return;
        }

        const doctorId = doctor?.uid;
        const patientId = user?.uid;

        if (!doctorId || !patientId) {
            toast.error('Doctor or Patient information is missing.');
            console.error('Doctor or Patient data is invalid:', { doctor, user });
            return;
        }

        const appointmentData = {
            date: selectedDate, // Replace this with your selected date variable
            timeSlot: selectedSlot,
            notes: notes.trim(),
            doctorId: doctorId,
            doctorName: doctor?.displayName || 'Unknown Doctor',
            patientId: patientId,
            patientName: patientName || user?.displayName || 'Unknown Patient',
        };

        console.log('Attempting to book appointment with data:', appointmentData);

        try {
            const doctorRef = doc(db, 'doctors', doctorId);

            await runTransaction(db, async (transaction) => {
                const doctorSnapshot = await transaction.get(doctorRef);
                if (!doctorSnapshot.exists()) {
                    throw new Error('Doctor does not exist');
                }

                const doctorData = doctorSnapshot.data();
                const schedule = doctorData.schedule || {};

                // // Check if the selected slot is still available
                // const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }); // Get the day name
                // if (
                //     !schedule[dayOfWeek]?.enabled ||
                //     !generateTimeSlots(schedule[dayOfWeek].start, schedule[dayOfWeek].end).includes(selectedSlot)
                // ) {
                //     throw new Error("Selected time slot is no longer available.");
                // }

                // Add the appointment
                const appointmentsCollectionRef = collection(db, 'appointments');
                transaction.set(doc(appointmentsCollectionRef), appointmentData);
            });

            toast.success('Appointment booked successfully!');

            // Reset form and state
            setIsBookDialogOpen(false);
            setSelectedDate("");
            setSelectedSlot("");
            setNotes("");
        } catch (error) {
            toast.error(error.message || 'Failed to book appointment. Please try again later.');
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div>
            {/* View Doctor Profile Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-blue-900 dark:bg-blue-500 hover:bg-blue-800 dark:hover:bg-blue-600 text-primary-foreground">
                        View
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Doctor Profile</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-4 mb-4">
                        {doctor.profile.imageUrl ? (
                            <img
                                src={doctor.profile.imageUrl}
                                alt="Doctor Profile"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        ) : (
                            <ProfileAvatar user={doctor} className="w-16 h-16" />
                        )}
                        <div
                            onClick={() => {
                                navigator.clipboard.writeText(doctor.id);
                                toast?.success(`${doctor.id} is copied to clipboard`);
                            }}
                        >
                            <h2 className="text-xl font-semibold">{doctor.displayName}</h2>
                        </div>
                    </div>
                    <ScrollArea className="max-h-[60vh]">
                        {profileSections.map((section, index) => (
                            <Card key={index} className="mb-4">
                                <CardHeader>
                                    <CardTitle>{section.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {section.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex justify-between py-1">
                                            <span className="font-medium">{item.label}:</span>
                                            <span>{item.value}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            {/* Book Appointment Dialog */}
            <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="ml-2 bg-green-900 dark:bg-green-500 hover:bg-green-800 dark:hover:bg-green-600 text-primary-foreground"
                        onClick={() => setIsBookDialogOpen(true)}
                    >
                        Book Appointment
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Book an Appointment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-medium">Doctor Name:</span>
                            <span>{doctor.displayName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Patient Name:</span>
                            <span>{patientName}</span>
                        </div>
                        <div>
                            <label className="font-medium block mb-2">Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => handleDateSelection(e.target.value)}
                                className="border p-2 w-full"
                            />
                        </div>
                        {availableSlots.length > 0 && (
                            <div>
                                <label className="font-medium block mb-2">Select Time Slot:</label>
                                <select
                                    value={selectedSlot}
                                    onChange={(e) => setSelectedSlot(e.target.value)}
                                    className="border p-2 w-full"
                                >
                                    <option value="">Select a Time Slot</option>
                                    {availableSlots.map((slot, index) => (
                                        <option key={index} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <label className="font-medium block mb-2">Notes:</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="border p-2 w-full"
                                placeholder="Add notes for the doctor"
                            />
                        </div>
                    </div>
                    <Button
                        className="mt-4 bg-blue-900 dark:bg-blue-500 hover:bg-blue-800 dark:hover:bg-blue-600 text-primary-foreground"
                        onClick={handleBookAppointment}
                    >
                        Book Appointment
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
