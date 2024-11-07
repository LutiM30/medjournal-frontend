import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { FaUser, FaBriefcaseMedical, FaClipboardList } from "react-icons/fa";

const PatientProfile = () => {
  const user = useAtomValue(userAtom);
  const [patientData, setPatientData] = useState({
    personalInfo: {},
    medicalHistory: {},
    lifestyleInfo: {},
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!user || !user.uid) return;
      const patientDocRef = doc(db, "patients", user.uid);
      const docSnap = await getDoc(patientDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPatientData({
          personalInfo: {
            firstName: data.firstName,
            lastName: data.lastName,
            birthdate: data.birthdate,
            gender: data.gender,
            bloodGroup: data.bloodGroup,
            height: data.height,
            weight: data.weight,
          },
          medicalHistory: {
            allergies: data.allergies,
            currentMedications: data.currentMedications,
            medicalConditions: data.medicalConditions,
            pastSurgeries: data.pastSurgeries,
            otherNotes: data.otherNotes,
          },
          lifestyleInfo: {
            dietPreference: data.dietPreference,
            exerciseFrequency: data.exerciseFrequency,
            smokingStatus: data.smokingStatus,
            alcoholConsumption: data.alcoholConsumption,
          },
        });
      }
    };
    fetchPatientData();
  }, [user]);

  const handleSubmit = async () => {
    const profileData = {
      ...patientData.personalInfo,
      ...patientData.medicalHistory,
      ...patientData.lifestyleInfo,
      isProfileComplete: true,
      createdAt: serverTimestamp(),
    };

    if (!user || !user.uid) {
      alert("User not authenticated.");
      return;
    }
    const patientDocRef = doc(db, "patients", user.uid);
    await setDoc(patientDocRef, profileData, { merge: true });
    alert("Profile updated successfully");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-grow bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <main className="flex-grow p-4 overflow-y-auto">
          <div className="mt-8 space-y-8">
            {/* Personal Information Section */}
            <section className="border p-4 rounded-lg bg-blue-50">
              <h2 className="text-xl font-bold text-blue-600 flex items-center">
                <FaUser className="mr-2" /> Personal Information
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>First Name:</strong>{" "}
                  {patientData.personalInfo.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong>{" "}
                  {patientData.personalInfo.lastName}
                </p>
                <p>
                  <strong>Birthdate:</strong>{" "}
                  {patientData.personalInfo.birthdate}
                </p>
                <p>
                  <strong>Gender:</strong> {patientData.personalInfo.gender}
                </p>
                <p>
                  <strong>Blood Group:</strong>{" "}
                  {patientData.personalInfo.bloodGroup}
                </p>
                <p>
                  <strong>Height:</strong> {patientData.personalInfo.height}
                </p>
                <p>
                  <strong>Weight:</strong> {patientData.personalInfo.weight}
                </p>
              </div>
            </section>

            {/* Medical and Lifestyle Information Sections Side by Side */}
            <div className="flex space-x-4">
              {/* Medical History Section */}
              <section className="w-1/2 border p-4 rounded-lg bg-green-50">
                <h2 className="text-xl font-bold text-green-600 flex items-center">
                  <FaBriefcaseMedical className="mr-2" /> Medical History
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Allergies:</strong>{" "}
                    {patientData.medicalHistory.allergies}
                  </p>
                  <p>
                    <strong>Current Medications:</strong>{" "}
                    {patientData.medicalHistory.currentMedications}
                  </p>
                  <p>
                    <strong>Medical Conditions:</strong>{" "}
                    {patientData.medicalHistory.medicalConditions}
                  </p>
                  <p>
                    <strong>Past Surgeries:</strong>{" "}
                    {patientData.medicalHistory.pastSurgeries}
                  </p>
                  <p>
                    <strong>Other Notes:</strong>{" "}
                    {patientData.medicalHistory.otherNotes}
                  </p>
                </div>
              </section>

              {/* Lifestyle Information Section */}
              <section className="w-1/2 border p-4 rounded-lg bg-yellow-50">
                <h2 className="text-xl font-bold text-yellow-600 flex items-center">
                  <FaClipboardList className="mr-2" /> Lifestyle Information
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Diet Preference:</strong>{" "}
                    {patientData.lifestyleInfo.dietPreference}
                  </p>
                  <p>
                    <strong>Exercise Frequency:</strong>{" "}
                    {patientData.lifestyleInfo.exerciseFrequency}
                  </p>
                  <p>
                    <strong>Smoking Status:</strong>{" "}
                    {patientData.lifestyleInfo.smokingStatus}
                  </p>
                  <p>
                    <strong>Alcohol Consumption:</strong>{" "}
                    {patientData.lifestyleInfo.alcoholConsumption}
                  </p>
                </div>
              </section>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
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
