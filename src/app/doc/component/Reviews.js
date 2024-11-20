import { BsFileDiff } from 'react-icons/bs';
import Image from 'next/image';
import doctorImage from './images/doc1.jpg';
import React, { useState } from 'react';

const appointmentsData = [
  {
    id: 1,
    appointmentTime: 'Monday, Oct 9, 2024 - 10:00 AM',
  },
  {
    id: 2,
    appointmentTime: 'Wednesday, Oct 11, 2024 - 2:00 PM',
  },
  {
    id: 3,
    appointmentTime: 'Friday, Oct 13, 2024 - 9:00 AM',
  },
];

const UpcomingAppointments = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsPopupOpen(true);
  };

  const handleCancelClick = (appointmentId) => {
    console.log('Cancel appointment with id:', appointmentId);
    setIsPopupOpen(false);
    setSelectedAppointment(null);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAppointment(null);
  };
  return (
    <div className='max-w-4xl p-6 mx-auto mb-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg dark:bg-slate-900'>
      <h2 className='mb-4 text-2xl font-semibold text-green-600'>
        Upcoming Appointments for Dr. John Czaja
      </h2>

      <div className='flex items-start p-4 bg-gray-100 rounded-lg shadow-md dark:bg-slate-800 '>
        <Image
          src={doctorImage}
          alt='Dr. John Czaja'
          width={100}
          height={100}
          className='mr-4 rounded-full'
        />
        <div>
          {/* <div className='flex items-start p-4 bg-gray-100 rounded-lg shadow-md dark:bg-slate-800'> */}
          <h3 className='font-semibold text-purple-600'>Appointments:</h3>
          <ul className='list-disc list-inside dark:text-white'>
            {appointmentsData.map((appointment) => (
              <li
                key={appointment.id}
                className='relative flex items-center justify-between text-white-800 mb-4'
              >
                <span>{appointment.appointmentTime}</span>
                <BsFileDiff
                  className='text-2xl text-blue-600 cursor-pointer hover:text-blue-800 dark:text-white dark:hover:text-gray-300 ml-10'
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
              <button className='w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600'>
                Update Appointment
              </button>
              <button
                className='w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600'
                onClick={handleCancelClick}
              >
                Cancel Appointment
              </button>
            </div>
            <button
              className='w-full px-4 py-2 mt-4 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              onClick={handleClosePopup}
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
