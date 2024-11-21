import React, { useState } from 'react';
import PersonalInfo from './component/PersonalInfo';
import MedicalHistory from './component/MedicalHistory';
import LifestyleInfo from './component/LifestyleInfo';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import DisplayPatientProfile from './DisplayPatientProfile';
import { toast } from 'sonner';

const PatientProfile = () => {
  const user = useAtomValue(userAtom);

  const [personalInfo, setPersonalInfo] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    birthdate: '',
    height: '',
    weight: '',
    bloodgroup: '',
    smokingstatus: '',
    alcoholconsumption: '',
    dietpreference: '',
    exercisefrequency: '',
  });

  const [medicalHistory, setMedicalHistory] = useState({
    allergies: '',
    medicalconditions: '',
    pastsurgeries: '',
    currentmedications: '',
    othernotes: '',
  });

  const [lifestyleInfo, setLifestyleInfo] = useState({
    alcoholconsumption: '',
    exercisefrequency: '',
    dietpreference: '',
    smokingstatus: '',
  });

  const [isProfileSubmitted, setIsProfileSubmitted] = useState(false); // To track if the profile has been submitted

  const validateData = () => {
    if (
      !personalInfo.firstname ||
      !personalInfo.lastname ||
      !personalInfo.gender
    ) {
      alert('Please fill out all required fields in Personal Info.');
      return false;
    }
    if (!medicalHistory.allergies || !medicalHistory.medicalconditions) {
      alert('Please fill out all required fields in Medical History.');
      return false;
    }
    if (!lifestyleInfo.alcoholconsumption) {
      alert('Please fill out all required fields in Lifestyle Info.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;

    const profileData = {
      ...personalInfo,
      ...medicalHistory,
      ...lifestyleInfo,
      isProfileComplete: true,
      updatedAt: serverTimestamp(),
    };

    try {
      if (!user || !user.uid) {
        alert('User not authenticated.');
        return;
      }

      // Reference the "patients" collection instead of "users"
      const patientDoc = doc(db, 'patients', user.uid);
      await setDoc(patientDoc, profileData, { merge: true });

      toast.success('Profile updated successfully');
      setIsProfileSubmitted(true);
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast.success(
        'There was an error updating your profile. Please try again.'
      );
    }
  };

  return (
    <div className='relative flex flex-col h-screen pt-16 bg-center bg-cover'>
      <div className='flex flex-grow bg-white dark:bg-slate-900 bg-opacity-80'>
        <main className='flex-grow p-4'>
          <div className='mt-8'>
            {!isProfileSubmitted ? (
              <>
                <PersonalInfo
                  onChange={setPersonalInfo}
                  personalInfo={personalInfo}
                />

                <div className='flex justify-between space-x-4'>
                  <div className='flex-1'>
                    <MedicalHistory
                      onChange={setMedicalHistory}
                      medicalHistory={medicalHistory}
                    />
                  </div>

                  <div className='flex-1'>
                    <LifestyleInfo
                      onChange={setLifestyleInfo}
                      lifestyleInfo={lifestyleInfo}
                    />
                  </div>
                </div>

                <div className='flex justify-center mt-6'>
                  <button
                    onClick={handleSubmit}
                    className='px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600'
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <DisplayPatientProfile /> // Show the PatientForm after successful submission
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;
