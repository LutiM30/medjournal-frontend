'use client';
import React from 'react';
import DoctorProfile from '../DoctorProfile';
import AfterLoadingIsCompleted from '@/components/AfterLoadingIsCompleted';

const Home = () => {
  return (
    <AfterLoadingIsCompleted className='mb-28'>
      <DoctorProfile />
    </AfterLoadingIsCompleted>
  );
};

export default Home;
