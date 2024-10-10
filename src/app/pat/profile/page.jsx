'use client';
import React from 'react';
import PatientProfile from '../PatientProfile';
import withRoleProtection from '@/lib/hooks/withRoleProtection';
import { PATIENT_ROLE } from '@/lib/constants';

const Page = () => {
  return (
    <div>
      <PatientProfile />
    </div>
  );
};

export default withRoleProtection(Page, PATIENT_ROLE);
