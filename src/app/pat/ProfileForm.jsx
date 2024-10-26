import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const PatientProfile = () => {
  const user = useAtomValue(userAtom);
  const [patientData, setPatientData] = useState({
    personalInfo: {},
    medicalHistory: {},
    lifestyleInfo: {},
  });

  // Fetch the patient data from Firestore when the component mounts
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
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
        } else {
          console.log("No patient data found!");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error.message);
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

    try {
      if (!user || !user.uid) {
        alert("User not authenticated.");
        return;
      }

      const patientDocRef = doc(db, "patients", user.uid);
      await setDoc(patientDocRef, profileData, { merge: true });

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
            {/* Personal Information Section */}
            <section className="mb-8">
              <h2 className="text-xl font-bold">Personal Information</h2>
              <div className="space-y-2">
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

            {/* Medical History Section */}
            <section className="mb-8">
              <h2 className="text-xl font-bold">Medical History</h2>
              <div className="space-y-2">
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
            <section className="mb-8">
              <h2 className="text-xl font-bold">Lifestyle Information</h2>
              <div className="space-y-2">
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

            {/* Submit Button */}
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
