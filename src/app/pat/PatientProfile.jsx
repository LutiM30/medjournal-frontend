// src/app/pat/PatientProfile.jsx
import React from "react";
import PersonalInfo from "./component/PersonalInfo"; // Adjust import path if necessary
import MedicalHistory from "./component/MedicalHistory"; // Adjust import path if necessary
import LifestyleInfo from "./component/LifestyleInfo"; // Adjust import path if necessary
import { Footer } from "@/components/ui/Footer"; // Use named import and correct casing

const PatientProfile = () => {
  return (
    <div className="flex flex-col h-screen pt-16 relative bg-cover bg-center">
      <div className="flex flex-grow bg-white dark:bg-slate-900 bg-opacity-80">
        {/* White background with opacity for readability */}
        <main className="flex-grow p-4">
          <div className="mt-8">
            <PersonalInfo />
            <div className="flex justify-between space-x-4">
              <div className="flex-1">
                <MedicalHistory />
              </div>
              <div className="flex-1">
                <LifestyleInfo />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;
