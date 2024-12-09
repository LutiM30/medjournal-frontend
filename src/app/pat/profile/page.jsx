'use client';
import React from 'react';
import PatientProfile from '../PatientProfile';
import ProfileForm from '../DisplayPatientProfile';
import withRoleProtection from '@/lib/hooks/withRoleProtection';
import { PATIENT_ROLE } from '@/lib/constants';
import { userAtom } from '@/lib/atoms/userAtom';
import { useAtomValue } from 'jotai';

const Page = () => {
  const user = useAtomValue(userAtom);

  console.log('====================================');
  console.log(user);
  console.log('====================================');

  return (
    <div>
      {/* This code snippet is a conditional rendering logic in a React component. Here's what it does: */}
      {!user?.profile.isProfileComplete ? (
        <>
          {/* PatientProfile */}
          <PatientProfile />
        </>
      ) : (
        <>
          {/* dashboard */}
          <ProfileForm />
        </>
      )}
    </div>
  );
};

export default withRoleProtection(Page, PATIENT_ROLE);
