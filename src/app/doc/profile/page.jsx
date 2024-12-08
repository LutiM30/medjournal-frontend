'use client';
import React from 'react';
import DoctorProfile from '../DoctorProfile';
import AfterLoadingIsCompleted from '@/components/AfterLoadingIsCompleted';

const Home = () => {
  return (
    <AfterLoadingIsCompleted>
      <DoctorProfile />
    </AfterLoadingIsCompleted>
  );
};

export default Home;
