// src/app/pat/PatientProfile.jsx
import React from "react";
import PersonalInfo from "./component/PersonalInfo"; // Adjust import path if necessary
import MedicalHistory from "./component/MedicalHistory"; // Adjust import path if necessary
import LifestyleInfo from "./component/LifestyleInfo"; // Adjust import path if necessary

const PatientProfile = () => {
  return (
    <div className="flex flex-col h-screen pt-20 relative">
      <div className="flex flex-grow">
        <main className="flex-grow p-4">
          <h1 className="text-3xl font-bold mb-6">Patient Profile</h1>
          <div className="space-y-6">
            <PersonalInfo />
            <MedicalHistory />
            <LifestyleInfo />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;
