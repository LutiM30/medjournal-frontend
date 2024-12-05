'use client'; // Marking the component as a Client Component

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase'; // Firebase import for adding data
import { collection, getDocs } from 'firebase/firestore';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch all appointments from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentsRef = collection(db, 'appointments');
      const snapshot = await getDocs(appointmentsRef);
      const fetchedAppointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(fetchedAppointments);
    };

    fetchAppointments();
  }, []);

  return (
    <div className='p-6 bg-gradient-to-br from-purple-50 to-teal-100 min-h-screen pt-16'>
      <h1 className='text-5xl font-bold text-gray-800 mb-8 text-center'></h1>

      {/* Table Section */}
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto bg-white rounded-lg shadow-lg'>
          <thead className='bg-teal-600 text-white'>
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
                  className='border-b last:border-none hover:bg-gray-100 transition'
                >
                  <td className='p-4'>{appointment.doctorName}</td>
                  <td className='p-4'>{appointment.date}</td>
                  <td className='p-4'>{appointment.time || 'N/A'}</td>
                  <td className='p-4'>{appointment.notes || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='p-4 text-center text-gray-500'>
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
