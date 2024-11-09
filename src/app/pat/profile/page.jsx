'use client';
import React from 'react';
import PatientProfile from '../PatientProfile';
import ProfileForm from '../ProfileForm';
import withRoleProtection from '@/lib/hooks/withRoleProtection';
import { PATIENT_ROLE } from '@/lib/constants';
import { userAtom } from '@/lib/atoms/userAtom';
import { useAtomValue } from 'jotai';
import Container from '@/components/ui/Container';

const Page = () => {
  const user = useAtomValue(userAtom);

  return (
    <Container className='my-12'>
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
    </Container>
  );
};

export default withRoleProtection(Page, PATIENT_ROLE);
