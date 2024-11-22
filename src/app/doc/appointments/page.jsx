'use client';
import React from 'react';
import Appointments from '../Appointments';
import AfterLoadingIsCompleted from '@/components/AfterLoadingIsCompleted';

const AppointmentsPage = () => {
  return (
    <AfterLoadingIsCompleted className='mb-28'>
      <Appointments />
    </AfterLoadingIsCompleted>
  );
};

export default AppointmentsPage;
