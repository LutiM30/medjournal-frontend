"use client";
import React from "react";
import PatientProfile from "../PatientProfile";
import withRoleProtection from "@/lib/hooks/withRoleProtection";

const Page = () => {
  return (
    <div>
      <PatientProfile />
    </div>
  );
};

export default withRoleProtection(Page, "patients");
