"use client";
import React from 'react';
import withRoleProtection from '@/lib/hooks/withRoleProtection'; 

const Page = () => {
  return <div>page</div>;
};

export default withRoleProtection(Page, "patients");
