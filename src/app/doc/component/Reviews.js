import React, { useState, useEffect } from 'react';
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
            setAppointments(fetchedAppointments);
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

  const isTimeSlotAvailable = (selectedDate, selectedTime) => {
    if (!doctorSchedule) return false;

    const day = new Date(selectedDate)
      .toLocaleDateString('en-US', {
        weekday: 'long',
      })
      .toLowerCase();
    const scheduleForDay = doctorSchedule[day];

    if (!scheduleForDay || !scheduleForDay.enabled) return false;

    const convertTo24Hour = (time) => {
      const [t, period] = time.split(' ');
      let [hours, minutes] = t.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const selectedTimeIn24 = convertTo24Hour(selectedTime);
    const scheduleStart = scheduleForDay.start;
    const scheduleEnd = scheduleForDay.end;

    return selectedTimeIn24 >= scheduleStart && selectedTimeIn24 <= scheduleEnd;
  };

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
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
      setIsUploading(true);
      await deleteDoc(doc(db, 'appointments', appointmentId));
      toast.success('Appointment cancelled successfully');
      handleClosePopup();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateAppointment = async () => {
    if (!selectedTime || !selectedDate) {
      toast.error('Please select both a date and a time for the appointment.');
      return;
    }

    if (!isTimeSlotAvailable(selectedDate, selectedTime)) {
      toast.error('Selected time is outside of your available hours.');
      return;
    }

    const formattedDate = formatDate(selectedDate);
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

  // Rest of the component remains the same as in the original code
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
                  className='relative flex items-center justify-between text-white-800 mb-4'
                >
                  <span className='mr-3'>{appointment.date}</span>|
                  <span className='ml-3 mr-3'>{appointment.timeSlot}</span>|
                  <span className='ml-3'>{appointment.patientName}</span>
                  <BsFillPencilFill
                    className='text-l text-blue-600 cursor-pointer hover:text-blue-800 dark:text-white dark:hover:text-gray-300 ml-10'
                    onClick={() => handleEditClick(appointment)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Popup modal code remains the same as in the original code, 
          but now uses handleClosePopup and handleCancelClick */}
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
};

export default UpcomingAppointments;
