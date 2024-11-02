'use client';
import React from 'react';
import DoctorProfile from '../DoctorProfile';
import withRoleProtection from '@/lib/hooks/withRoleProtection';
import { DOCTOR_ROLE } from '@/lib/constants';

const Home = () => {
  return (
    <div>
      <DoctorProfile />
    </div>
  );
};

export default withRoleProtection(Home, DOCTOR_ROLE);
