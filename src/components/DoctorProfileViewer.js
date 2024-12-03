'use client';

import React, { useState } from 'react';
import { useAtom } from 'jotai'; // Import useAtom from jotai
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
import ProfileAvatar from '@/components/ProfileAvatar'; // Assuming you have a common Avatar component
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { toast } from 'sonner';
import { db } from '@/lib/firebase'; // Firebase import for adding data
import { set, ref } from 'firebase/database';
import { userAtom } from '@/lib/atoms/userAtom'; // Import the userAtom

export default function ProfileViewer({
    doctor = {
        id: '12345',
        displayName: 'Dr. John Doe',
        avatarUrl: '/placeholder.svg?height=128&width=128',
        profile: {
            specialization: 'Cardiology',
            experience: '10 years',
            qualification: 'MD, MBBS',
            hospital: 'XYZ Hospital',
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

    // Use the useAtom hook to get patient name from userAtom
    const [user] = useAtom(userAtom);  // userAtom should store the patient info
    const patientName = user?.displayName; // 

    const profileSections = [
        {
            title: 'Professional Information',
            items: [
                { label: 'Specialization', value: doctor.profile?.specialization },
                { label: 'Experience', value: doctor.profile?.experience },
                { label: 'Qualification', value: doctor.profile?.qualification },
                { label: 'Clinic Name', value: doctor.profile?.hospital },
            ],
        },
        {
            title: 'Contact Information',
            items: [
                { label: 'Phone', value: doctor.profile?.phone },
                { label: 'Email', value: doctor.profile?.email },
            ],
        },

        {
            title: 'Schedule and Location',
            items: [
                {
                    label: 'Schedule',
                    value: doctor.profile?.schedule ? (
                        <ul>
                            {Object.entries(doctor.profile.schedule).map(([day, { enabled, start, end }]) => (
                                enabled ? (
                                    <li key={day}>
                                        {day}: {start} - {end}
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    ) : 'N/A',
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
        const appointmentData = {
            date: "2024-02-15", // Replace with dynamic date selection if needed
            time: "10:00 AM",   // Replace with dynamic time selection if needed
            doctorId: doctor.id, // Assuming doctor.id is the doctor's Firestore UID
            doctorName: doctor.displayName,
            patientId: user?.uid, // Assuming user atom contains the patient's Firestore UID
            patientName: patientName, // Retrieved from userAtom
        };

        console.log("Booking Appointment:", appointmentData);

        try {
            // Reference the 'appointments' collection in Firestore
            const appointmentsCollectionRef = collection(db, 'appointments');
            // Add a new document with the appointment data
            await addDoc(appointmentsCollectionRef, appointmentData);
            toast.success('Appointment booked successfully!');
            setIsBookDialogOpen(false); // Close the dialog after booking
        } catch (error) {
            toast.error('Failed to book appointment.');
            console.error("Error booking appointment:", error);
        }
    };

    const id = doctor?.profile ? doctor?.profile[`${doctor?.role}_id`] : doctor.id;

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
                                navigator.clipboard.writeText(id);
                                toast?.success(`${id} is copied to clipboard`);
                            }}
                        >
                            <h2 className="text-xl font-semibold">{doctor.displayName}</h2>
                            {isViewDialogOpen ? (
                                <TooltipProvider>
                                    <Tooltip defaultOpen={false}>
                                        <TooltipTrigger>
                                            <p className="text-sm text-muted-foreground">
                                                <strong>Doctor ID: </strong>
                                                {id}
                                            </p>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">Click to copy</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <></>
                            )}
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
                                            <span className="text-muted-foreground">{item.value}</span>
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
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add any notes for the appointment"
                            className="w-full h-20 p-2 border rounded-md"
                        />
                        <Button className="bg-blue-600 text-white" onClick={handleBookAppointment}>
                            Confirm Appointment
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
