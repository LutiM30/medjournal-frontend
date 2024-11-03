'use client';
import React from 'react';
import PatientList from '../PatientList';
import withRoleProtection from '@/lib/hooks/withRoleProtection';
import { DOCTOR_ROLE } from '@/lib/constants';

const Home = () => {
  return (
    <div>
      <PatientList />
    </div>
  );
};

export default withRoleProtection(Home, DOCTOR_ROLE);
