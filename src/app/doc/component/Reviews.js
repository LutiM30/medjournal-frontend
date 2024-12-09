import React, { useState, useEffect, useMemo } from 'react';
import ProfilePictureHandler from '@/components/ProfilePictureHandler';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';

import { db } from '@/lib/firebase';

import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { BsFillPencilFill } from 'react-icons/bs';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const MEETING_DURATION = 30; // minutes

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
const convertTo24Hour = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return { hours, minutes };
};
const formatTimeForDisplay = (hours, minutes) => {
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${formattedMinutes} ${period}`;
};

const calculateEndTime = (startTime, duration) => {
  const [time, period] = startTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  const startDate = new Date();
  startDate.setHours(hours, minutes);

  const endDate = new Date(startDate.getTime() + duration * 60000);

  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();
  const endPeriod = endHours >= 12 ? 'PM' : 'AM';

  const formattedHours = endHours % 12 || 12;
  const formattedMinutes = endMinutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${endPeriod}`;
};

const UpcomingAppointments = () => {
  const user = useAtomValue(userAtom);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedTime, setSelectedTime] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchDoctorData = async () => {
      try {
        // Fetch doctor's schedule
        const doctorQuery = query(
          collection(db, 'doctors'),
          where('uid', '==', user.uid)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const doctorData = doctorSnapshot.docs[0].data();
          setDoctorSchedule(doctorData.schedule);
        }

        // Fetch appointments for this doctor
        const appointmentsQuery = query(
          collection(db, 'appointments'),
          where('doctorId', '==', user.uid)
        );
        const unsubscribe = onSnapshot(
          appointmentsQuery,
          (snapshot) => {
            const fetchedAppointments = snapshot.docs
              .map((doc) => ({ id: doc.id, ...doc.data() }))
              .sort((a, b) => new Date(a.date) - new Date(b.date));

            //for all appointments
            // setAppointments(fetchedAppointments);
            //for 3 upcoming appointments
            const upcomingAppointments = fetchedAppointments.slice(0, 3);
            setAppointments(upcomingAppointments);
          },
          (error) => {
            console.error('Error fetching appointments:', error);
            toast.error('Failed to load appointments');
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        toast.error('Failed to load doctor information');
      }
    };

    fetchDoctorData();
  }, [user]);

  // Generate available dates based on doctor's schedule
  const availableDates = useMemo(() => {
    if (!doctorSchedule) return [];

    const dates = [];
    const today = new Date();

    // Generate dates for next 30 days
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dayName = currentDate
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase();
      const daySchedule =
        doctorSchedule[dayName.charAt(0).toUpperCase() + dayName.slice(1)];
      if (daySchedule && daySchedule.enabled) {
        dates.push(currentDate.toISOString().split('T')[0]);
      }
    }
    return dates;
  }, [doctorSchedule]);

  // Generate available time slots based on doctor's schedule and selected date
  // Generate available time slots based on doctor's schedule and selected date
  const availableTimeSlots = useMemo(() => {
    if (!doctorSchedule || !selectedDate) return [];

    const day = new Date(selectedDate)
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    const daySchedule = doctorSchedule[capitalizedDay];

    if (!daySchedule || !daySchedule.enabled) return [];

    const startTime = convertTo24Hour(daySchedule.start);
    const endTime = convertTo24Hour(daySchedule.end);

    const timeSlots = [];
    const currentTime = new Date();
    currentTime.setHours(startTime.hours, startTime.minutes, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(endTime.hours, endTime.minutes, 0, 0);

    while (currentTime < maxTime) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const timeSlot = formatTimeForDisplay(hours, minutes);

      // Check if this time slot is already booked
      const isBooked = appointments.some(
        (appointment) =>
          appointment.date === selectedDate &&
          appointment.timeSlot.startsWith(timeSlot)
      );

      if (!isBooked) {
        timeSlots.push(timeSlot);
      }

      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return timeSlots;
  }, [doctorSchedule, selectedDate, appointments]);

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDate(appointment.date);
    setSelectedTime('');
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAppointment(null);
    setSelectedTime('');
    setSelectedDate(getCurrentDate());
  };

  const handleCancelClick = async (appointmentId) => {
    try {
      if (window.confirm('Are you sure you want to cancel this appointment?')) {
        setIsUploading(true);
        await deleteDoc(doc(db, 'appointments', appointmentId));
        toast.success('Appointment cancelled successfully!');
        handleClosePopup();
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateAppointment = async () => {
    if (!selectedDate) {
      toast.error('Please select a date for the appointment.');
      return;
    }

    if (!selectedTime) {
      toast.error('Please select a time for the appointment.');
      return;
    }
    const endTime = calculateEndTime(selectedTime, MEETING_DURATION);

    try {
      setIsUploading(true);
      const appointmentRef = doc(db, 'appointments', selectedAppointment.id);
      await updateDoc(appointmentRef, {
        date: selectedDate,
        timeSlot: `${selectedTime} - ${endTime}`,
      });

      handleClosePopup();
      toast.success('Appointment updated successfully!');
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='max-w-4xl p-6 mx-auto mb-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg dark:bg-slate-900'>
      <h2 className='mb-4 text-2xl font-semibold text-green-600'>
        Upcoming Appointments for {user?.displayName || 'Dr. John Czaja'}
      </h2>

      <div className='flex items-start p-4 bg-gray-100 rounded-lg shadow-md dark:bg-slate-800'>
        <div className='mr-4'>
          <ProfilePictureHandler
            file={file}
            setFile={setFile}
            imageUrl={user?.photoURL || ''}
            isEditing={false}
          />
        </div>
        <div>
          <h3 className='font-semibold text-purple-600'>Appointments:</h3>
          {appointments.length === 0 ? (
            <p className='text-gray-600 dark:text-gray-300'>
              No upcoming appointments scheduled.
            </p>
          ) : (
            <ul className='list-disc list-inside dark:text-white'>
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className='relative flex items-center justify-between mb-4 text-white-800'
                >
                  <span className='mr-3'>{appointment.date}</span>|
                  <span className='ml-3 mr-3'>{appointment.timeSlot}</span>|
                  <span className='ml-3'>{appointment.patientName}</span>
                  <BsFillPencilFill
                    className='ml-10 text-blue-600 cursor-pointer text-l hover:text-blue-800 dark:text-white dark:hover:text-gray-300'
                    onClick={() => handleEditClick(appointment)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-sm p-6 bg-white rounded-lg shadow-lg dark:bg-slate-800'>
            <h3 className='mb-4 text-lg font-semibold text-gray-800 dark:text-white'>
              Edit Appointment
            </h3>
            <p className='mb-4 text-gray-600 dark:text-gray-300'>
              Current: {selectedAppointment?.date}{' '}
              {selectedAppointment?.timeSlot}
            </p>
            <div className='space-y-4'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Select Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime(''); // Reset time when date changes
                  }}
                  className='w-full p-2 border rounded-md'
                >
                  <option value=''>Select a date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {formatDate(date)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Select Time (30-min slots)
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className='w-full p-2 border rounded-md'
                  disabled={!selectedDate}
                >
                  <option value=''>Select a time</option>
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time} - {calculateEndTime(time, MEETING_DURATION)}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className='w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600'
                onClick={handleUpdateAppointment}
                disabled={isUploading || !selectedTime}
              >
                {isUploading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  'Update Appointment'
                )}
              </button>
              <button
                className='w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600'
                onClick={() => handleCancelClick(selectedAppointment.id)}
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  'Cancel Appointment'
                )}
              </button>
            </div>
            <button
              className='w-full px-4 py-2 mt-4 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              onClick={handleClosePopup}
              disabled={isUploading}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
