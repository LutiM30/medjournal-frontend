"use client";
import React from "react";
import DoctorProfile from "../DoctorProfile";
import withRoleProtection from "@/lib/hooks/withRoleProtection";

const Home = () => {
  return (
    <div>
      <DoctorProfile />
    </div>
  );
};

export default withRoleProtection(Home, "doctors");
