'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase'; // Firebase import for adding data
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError('No user logged in');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const appointmentsRef = collection(db, 'appointments');
        const q = query(appointmentsRef, where('patientId', '==', user.uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setAppointments([]);
        } else {
          const fetchedAppointments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAppointments(fetchedAppointments);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return (
    <div className='p-6 bg-gradient-to-br min-h-screen pt-16 dark:bg-black dark:text-white'>
      <h1 className='text-5xl font-bold text-gray-800 mb-8 text-center dark:text-white'></h1>

      {/* Table Section */}
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto bg-white rounded-lg shadow-lg dark:bg-gray-800'>
          <thead className='bg-teal-600 text-white dark:bg-gray-900'>
            <tr>
              <th className='p-4 text-left'>Doctor Name</th>
              <th className='p-4 text-left'>Date</th>
              <th className='p-4 text-left'>Time</th>
              <th className='p-4 text-left'>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className='border-b last:border-none hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                >
                  <td className='p-4'>{appointment.doctorName}</td>
                  <td className='p-4'>{appointment.date}</td>
                  <td className='p-4'>{appointment.timeSlot || 'N/A'}</td>
                  <td className='p-4'>{appointment.notes || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan='4'
                  className='p-4 text-center text-gray-500 dark:text-gray-400'
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentPage;
