"use client";
import React from 'react';
import withRoleProtection from '@/lib/hooks/withRoleProtection';
const DoctorPage = () => {
  return <div>Doctors Page</div>;
};

export default withRoleProtection(DoctorPage, "doctors");
