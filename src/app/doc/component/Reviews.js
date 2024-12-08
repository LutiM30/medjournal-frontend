import React, { useState } from 'react';
import ProfilePictureHandler from '@/components/ProfilePictureHandler';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { userAtom } from '@/lib/atoms/userAtom';

import { db } from '@/lib/firebase';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BsFillPencilFill } from 'react-icons/bs';
import Image from 'next/image';
import doctorImage from './images/doc1.jpg';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
];

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
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      comment: 'Routine checkup',
      appointmentTime: 'Monday, October 9, 2024 - 10:00 AM - 10:30 AM',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      comment: 'Follow-up consultation',
      appointmentTime: 'Wednesday, October 11, 2024 - 2:00 PM - 2:30 PM',
    },
    {
      id: 3,
      patientName: 'Emily Clark',
      comment: 'Annual physical exam',
      appointmentTime: 'Friday, October 13, 2024 - 9:00 AM - 9:30 AM',
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedTime, setSelectedTime] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing] = useState(true);

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsPopupOpen(true);
  };

  const handleCancelClick = async (appointmentId) => {
    try {
      const confirmation = window.confirm(
        'Are you sure you want to cancel this appointment?'
      );
      if (confirmation) {
        const updatedAppointments = appointments.filter(
          (appointment) => appointment.id !== appointmentId
        );
        setAppointments(updatedAppointments);
        setIsPopupOpen(false);
        setSelectedAppointment(null);

        toast.success('Appointment canceled successfully!');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  const handleUpdateAppointment = () => {
    if (!selectedTime) {
      toast.error('Please select a time for the appointment.');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date for the appointment.');
      return;
    }

    const formattedDate = formatDate(selectedDate);
    const endTime = calculateEndTime(selectedTime, MEETING_DURATION);

    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === selectedAppointment.id) {
        return {
          ...appointment,
          appointmentTime: `${formattedDate} - ${selectedTime} - ${endTime}`,
        };
      }
      return appointment;
    });

    setAppointments(updatedAppointments);
    setIsPopupOpen(false);
    setSelectedAppointment(null);
    setSelectedTime('');
    setSelectedDate(getCurrentDate());
    toast.success('Appointment updated successfully!');
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAppointment(null);
    setSelectedTime('');
    setSelectedDate(getCurrentDate());
  };
  if (user) {
    return (
      <div className='max-w-4xl p-6 mx-auto mb-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg dark:bg-slate-900'>
        <h2 className='mb-4 text-2xl font-semibold text-green-600'>
          Upcoming Appointments for {user?.displayName || 'Dr. John Czaja'}
        </h2>

        <div className='flex items-start p-4 bg-gray-100 rounded-lg shadow-md dark:bg-slate-800 '>
          <div className='mr-4'>
            <ProfilePictureHandler
              file={file}
              setFile={setFile}
              imageUrl={user.photoURL}
              //user.imageUrl
              isEditing={false}
              setImageUrl={setImageUrl}
            />
          </div>
          <div>
            {/* <div className='flex items-start p-4 bg-gray-100 rounded-lg shadow-md dark:bg-slate-800'> */}
            <h3 className='font-semibold text-purple-600'>Appointments:</h3>
            <ul className='list-disc list-inside dark:text-white'>
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className='relative flex items-center justify-between mb-4 text-white-800'
                >
                  <span className='mr-3'>{appointment.appointmentTime}</span>|
                  <span className='ml-3'>{appointment.patientName}</span>
                  <BsFillPencilFill
                    className='ml-10 text-blue-600 cursor-pointer text-l hover:text-blue-800 dark:text-white dark:hover:text-gray-300'
                    onClick={() => handleEditClick(appointment)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isPopupOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-full max-w-sm p-6 bg-white rounded-lg shadow-lg dark:bg-slate-800'>
              <h3 className='mb-4 text-lg font-semibold text-gray-800 dark:text-white'>
                Edit Appointment
              </h3>
              <p className='mb-4 text-gray-600 dark:text-gray-300'>
                {selectedAppointment?.appointmentTime}
              </p>
              {/* according to the time slote, the doctor can update or postpone the appointment
            
            calendar for select available appointment time and date */}

              <div className='space-y-4'>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Select Date
                  </label>
                  <input
                    type='date'
                    value={selectedDate}
                    min={getCurrentDate()}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className='w-full p-2 border rounded-md'
                  />
                </div>

                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Select Time (30-min slots)
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className='w-full p-2 border rounded-md'
                  >
                    <option value=''>Select a time</option>
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time}>
                        {time} - {calculateEndTime(time, MEETING_DURATION)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className='w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600'
                  onClick={handleUpdateAppointment}
                  disabled={isUploading}
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
  } else {
    <div>Please wait...</div>;
  }
};

export default UpcomingAppointments;
