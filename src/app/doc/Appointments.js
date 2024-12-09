'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase'; // Ensure correct import for your Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { EyeIcon, FilterIcon, FilePlusIcon } from 'lucide-react';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

function Appointments({ doctorId }) {
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalNotes, setOriginalNotes] = useState('');
  const [currentNotes, setCurrentNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsRef = collection(db, 'appointments');
        const appointmentsQuery = query(
          appointmentsRef,
          where('doctorId', '==', user.uid)
        );
        const snapshot = await getDocs(appointmentsQuery);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log({ data, user });

        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    console.log(fetchAppointments);
  }, [doctorId]);

  const handleSaveNotes = async (appointmentId) => {
    console.log('Notes saved for appointment:', appointmentId, currentNotes);
    setOriginalNotes(currentNotes);
  };

  const currentAppointments = appointments.filter((appt) => {
    const currentDate = new Date();
    const appointmentDate = new Date(appt.date);

    // Check if the appointment date is today
    if (appointmentDate.toDateString() !== currentDate.toDateString()) {
      return false;
    }

    // Extract start and end times from the timeSlot (e.g., "08:00 - 08:30")
    const [startTime, endTime] = appt.timeSlot.split(' - ');

    // Combine appointment date with start and end times
    const startDateTime = new Date(
      `${appointmentDate.toISOString().split('T')[0]}T${startTime}`
    );
    const endDateTime = new Date(
      `${appointmentDate.toISOString().split('T')[0]}T${endTime}`
    );

    return (
      dayjs(startDateTime).isAfter(currentDate),
      dayjs(endDateTime).isBefore(currentDate)
    );
  });
  const pastAppointments = appointments.filter(
    (appt) => new Date(appt.date) < new Date()
  );
  const upcomingAppointments = appointments.filter(
    (appt) => new Date(appt.date) > new Date()
  );

  return (
    <div className='max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md dark:bg-slate-900'>
      <h4 className='mb-6 text-2xl font-bold text-blue-700'>Appointments</h4>

      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <>
          {/* Current Appointments */}
          <Accordion type='single' collapsible>
            <AccordionItem value='current'>
              <AccordionTrigger>
                <h5 className='text-xl font-semibold'>Current Appointments</h5>
              </AccordionTrigger>
              <AccordionContent>
                {currentAppointments.length > 0 ? (
                  currentAppointments.map((appt) => (
                    <div key={appt.id} className='mb-6'>
                      <p className='mb-4 text-gray-500'>
                        Currently attending: <strong>{appt.patientName}</strong>{' '}
                        ({appt.timeSlot})
                      </p>
                      <textarea
                        className='w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700'
                        rows={4}
                        placeholder='Add notes regarding the patient...'
                        value={currentNotes}
                        onChange={(e) => setCurrentNotes(e.target.value)}
                      />
                      <div className='flex mt-4 space-x-2'>
                        <button
                          className='px-4 py-2 text-white bg-blue-500 rounded'
                          onClick={() => handleSaveNotes(appt.id)}
                        >
                          Save Notes
                        </button>
                        <button className='px-4 py-2 text-white bg-green-500 rounded'>
                          Appointment Done
                        </button>
                        <button
                          className='text-blue-500'
                          title='View Patient History'
                        >
                          <EyeIcon className='w-5 h-5' />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No current appointments found.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Upcoming Appointments */}
          <Accordion type='single' collapsible>
            <AccordionItem value='upcoming'>
              <AccordionTrigger>
                <h5 className='text-xl font-semibold'>Upcoming Appointments</h5>
              </AccordionTrigger>
              <AccordionContent>
                {loading ? (
                  <p>Loading upcoming appointments...</p>
                ) : upcomingAppointments.length === 0 ? (
                  <p className='mb-2 text-gray-500'>
                    No upcoming appointments found.
                  </p>
                ) : (
                  <div>
                    {upcomingAppointments.map((appt) => (
                      <div key={appt.id} className='mb-4'>
                        <p className='text-gray-500'>
                          Upcoming: <strong>{appt.patientName}</strong> on{' '}
                          <strong>{appt.date}</strong> at{' '}
                          <strong>{appt.timeSlot.split('-')[1]}</strong>
                          <br />
                          Condition: {appt.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Past Appointments */}
          <Accordion type='single' collapsible>
            <AccordionItem value='past'>
              <AccordionTrigger>
                <h5 className='text-xl font-semibold'>Past Appointments</h5>
              </AccordionTrigger>
              <AccordionContent>
                {pastAppointments.length > 0 ? (
                  <ScrollArea className='p-4 border rounded-md h-96'>
                    {pastAppointments.map((appt) => (
                      <Card key={appt.id} className='my-4'>
                        <CardHeader>
                          <p className='mb-2 text-gray-500'>
                            Appointment Date: <strong>{appt.date}</strong>
                          </p>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-2 text-gray-500'>
                            Patient: <strong>{appt.patientName}</strong>
                          </p>
                          {appt.notes ? (
                            <p className='text-gray-500 '>
                              Notes: <strong>{appt.notes}</strong>
                            </p>
                          ) : (
                            <></>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                ) : (
                  <p>No past appointments found.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
}

export default Appointments;
