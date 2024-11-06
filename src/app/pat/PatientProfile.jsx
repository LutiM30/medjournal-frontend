import React, { useState } from "react";
import PersonalInfo from "./component/PersonalInfo";
import MedicalHistory from "./component/MedicalHistory";
import LifestyleInfo from "./component/LifestyleInfo";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const PatientProfile = () => {
  const user = useAtomValue(userAtom);

  const [personalInfo, setPersonalInfo] = useState({});
  const [medicalHistory, setMedicalHistory] = useState({});
  const [lifestyleInfo, setLifestyleInfo] = useState({});

  const handleSubmit = async () => {
    const profileData = {
      ...personalInfo,
      ...medicalHistory,
      ...lifestyleInfo,
      isProfileComplete: true,
      createdAt: serverTimestamp(),
    };

    try {
      if (!user || !user.uid) {
        alert("User not authenticated.");
        return;
      }

      // Log the data being saved in a readable format
      console.log(
        "Profile data to be saved:",
        JSON.stringify(profileData, null, 2)
      );

      // Reference the "patients" collection instead of "users"
      const patientDoc = doc(db, "patients", user.uid);
      await setDoc(patientDoc, profileData, { merge: true });

      console.log(
        "Profile updated successfully in Firestore for patient:",
        user.uid
      );
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("There was an error updating your profile. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen pt-16 relative bg-cover bg-center">
      <div className="flex flex-grow bg-white bg-opacity-80">
        <main className="flex-grow p-4">
          <div className="mt-8">
            <PersonalInfo onChange={setPersonalInfo} />
            <div className="flex justify-between space-x-4">
              <div className="flex-1">
                <MedicalHistory onChange={setMedicalHistory} />
              </div>
              <div className="flex-1">
                <LifestyleInfo onChange={setLifestyleInfo} />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;
