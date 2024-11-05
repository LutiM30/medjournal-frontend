'use client';
import { api } from '@/lib/apis/api';
import { GET_USERS } from '@/lib/apis/apiUrls';
import { isLoadingAtom } from '@/lib/atoms/atoms';
import { collections } from '@/lib/functions/Firestore/collections';
import { getAllData } from '@/lib/functions/Firestore/functions';
import { useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const DoctorsListPage = () => {
  const setIsLoading = useSetAtom(isLoadingAtom);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
    notes: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [bookedAppointments, setBookedAppointments] = useState({}); // Track booked appointments by doctor ID

  const getUsersData = async () => {
    setIsLoading(true);
    try {
      const doctorsData = await getAllData(collections.DOCTORS);
      const userIDs = doctorsData.map((doctor) => doctor.uid);

      const params = {
        ids: userIDs.toString(),
      };

      const response = await api(GET_USERS, {}, '', params);
      console.log('API Response:', response.data);

      const users = response.data.users.map((user) => {
        const userDoc = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          profile: doctorsData.find((doctor) => doctor.uid === user.uid) || {},
        };
        return userDoc;
      });

      console.log('Mapped Users:', users);
      setDoctors(users);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.displayName &&
      doctor.profile &&
      doctor.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setAppointmentDetails({ date: '', time: '', notes: '' }); // Reset form fields
    setSuccessMessage(''); // Clear the success message when closing
    setIsBookingModalOpen(false); // Close the modal
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle appointment submission logic here (e.g., save to database)
    console.log('Booking Details:', {
      doctor: selectedDoctor,
      ...appointmentDetails,
    });

    // Set success message
    setSuccessMessage('Your appointment has been successfully booked!');

    // Update booked status
    setBookedAppointments((prev) => ({
      ...prev,
      [selectedDoctor.uid]: true, // Mark the selected doctor as booked
    }));

    // Reset form but keep the success message
    setAppointmentDetails({ date: '', time: '', notes: '' });
  };

  return (
    <div className='min-h-screen p-12 pt-16 bg-gradient-to-br from-purple-50 to-teal-100'>
      <div className='flex justify-center mb-8' style={{ marginTop: '3%' }}>
        <input
          type='text'
          placeholder='Search Doctor'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-1/2 p-3 transition duration-300 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:border-teal-500'
        />
        <button className='flex items-center p-3 ml-2 text-white transition duration-300 bg-teal-600 rounded-lg shadow-lg hover:bg-teal-700'>
          <FaSearch />
        </button>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredDoctors.length === 0 ? (
          <p className='text-center text-gray-500'>No doctors found.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.uid}
              className='p-4 transition-shadow duration-300 transform bg-white border border-gray-300 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-1'
              onClick={() => handleCardClick(doctor)}
              style={{
                backgroundColor:
                  selectedDoctor?.uid === doctor.uid
                    ? `hsl(${Math.random() * 360}, 70%, 80%)`
                    : 'white',
              }}
            >
              <img
                src={doctor.profile?.image || 'https://via.placeholder.com/150'}
                alt={doctor.displayName}
                className='object-cover w-full h-24 rounded-t-lg'
              />
              <h3 className='mb-1 text-xl font-semibold text-teal-600'>
                {doctor.displayName}
              </h3>
              <p className='mb-1 text-gray-600 truncate'>
                Email: {doctor.email || 'No email available.'}
              </p>
              <p className='mb-1 text-gray-600 truncate'>
                Specialty: {doctor.profile?.specialty || 'N/A'}
              </p>
              <p className='text-sm text-gray-500'>
                Phone: {doctor.profile?.phonenumber || 'N/A'}
              </p>
              <button
                className='w-full p-2 mt-4 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700'
                onClick={handleBookingClick}
                disabled={bookedAppointments[doctor.uid]} // Disable if already booked
              >
                {bookedAppointments[doctor.uid] ? 'Booked' : 'Book Appointment'}
              </button>
            </div>
          ))
        )}
      </div>

      {isBookingModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='p-4 bg-white rounded-lg shadow-lg w-80'>
            <h2 className='mb-2 text-xl font-bold'>Book Appointment</h2>
            <form onSubmit={handleBookingSubmit}>
              <label className='block mb-2'>
                Date:
                <input
                  type='date'
                  required
                  value={appointmentDetails.date}
                  onChange={(e) =>
                    setAppointmentDetails((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </label>
              <label className='block mb-2'>
                Time:
                <input
                  type='time'
                  required
                  value={appointmentDetails.time}
                  onChange={(e) =>
                    setAppointmentDetails((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </label>
              <label className='block mb-2'>
                Notes:
                <textarea
                  value={appointmentDetails.notes}
                  onChange={(e) =>
                    setAppointmentDetails((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </label>
              {successMessage && (
                <p className='mt-2 font-semibold text-green-500'>
                  {successMessage}
                </p>
              )}
              <div className='flex justify-end'>
                <button
                  type='button' // Ensure this is a button to prevent form submission
                  className='p-2 mt-4 mr-2 text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='p-2 mt-4 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700'
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsListPage;
