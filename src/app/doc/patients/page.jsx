'use client';
import React from 'react';
import PatientList from '../PatientList';
import AfterLoadingIsCompleted from '@/components/AfterLoadingIsCompleted';

const Patients = () => {
  return (
    <AfterLoadingIsCompleted>
      <PatientList />
    </AfterLoadingIsCompleted>
  );
};

export default Patients;
