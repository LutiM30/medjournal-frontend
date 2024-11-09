import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import {
  FaUser,
  FaBriefcaseMedical,
  FaClipboardList,
  FaEdit,
} from 'react-icons/fa';
import { User } from 'lucide-react';
import Container from '@/components/ui/Container';

const PatientProfile = () => {
  const user = useAtomValue(userAtom);
  const [patientData, setPatientData] = useState({
    personalInfo: {},
    medicalHistory: {},
    lifestyleInfo: {},
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!user || !user.uid) return;
      const patientDocRef = doc(db, 'patients', user.uid);
      const docSnap = await getDoc(patientDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPatientData({
          personalInfo: {
            Name: user.displayName,
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
      alert('User not authenticated.');
      return;
    }
    const patientDocRef = doc(db, 'patients', user.uid);
    await setDoc(patientDocRef, profileData, { merge: true });
    alert('Profile updated successfully');
    setIsEditing(false);
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  return (
    <Container className='w-full max-w-screen-xl  shadow-xl rounded-lg p-6 lg:p-12'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold text-primary-background dark:text-primary'>
          Patient Profile
        </h1>
        <button
          onClick={handleEditToggle}
          className='flex items-center text-blue-600 text-lg lg:text-xl'
        >
          <FaEdit className='mr-2' />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Grid layout for full-screen view */}
      <div className='grid gap-8 lg:grid-cols-3'>
        {/* Personal Information Section */}
        <section className='border p-6 rounded-lg bg-blue-100 shadow-sm'>
          <h2 className='text-2xl font-bold text-blue-700 flex items-center'>
            <User className='mr-2' /> Personal Information
          </h2>
          <div className='mt-4 space-y-3 text-gray-800'>
            {Object.entries(patientData.personalInfo).map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>{' '}
                {isEditing ? (
                  <input
                    className='border rounded px-3 py-1 w-full'
                    value={value || ''}
                    disabled={key === 'Name'}
                    onChange={(e) =>
                      setPatientData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          [key]: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  value
                )}
              </p>
            ))}
          </div>
        </section>

        {/* Medical History Section */}
        <section className='border p-6 rounded-lg bg-green-100 shadow-sm'>
          <h2 className='text-2xl font-bold text-green-700 flex items-center'>
            <FaBriefcaseMedical className='mr-2' /> Medical History
          </h2>
          <div className='mt-4 space-y-3 text-gray-800'>
            {Object.entries(patientData.medicalHistory).map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>{' '}
                {isEditing ? (
                  <input
                    className='border rounded px-3 py-1 w-full'
                    value={value || ''}
                    onChange={(e) =>
                      setPatientData((prev) => ({
                        ...prev,
                        medicalHistory: {
                          ...prev.medicalHistory,
                          [key]: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  value
                )}
              </p>
            ))}
          </div>
        </section>

        {/* Lifestyle Information Section */}
        <section className='border p-6 rounded-lg bg-yellow-100 shadow-sm'>
          <h2 className='text-2xl font-bold text-yellow-700 flex items-center'>
            <FaClipboardList className='mr-2' /> Lifestyle Information
          </h2>
          <div className='mt-4 space-y-3 text-gray-800'>
            {Object.entries(patientData.lifestyleInfo).map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>{' '}
                {isEditing ? (
                  <input
                    className='border rounded px-3 py-1 w-full'
                    value={value || ''}
                    onChange={(e) =>
                      setPatientData((prev) => ({
                        ...prev,
                        lifestyleInfo: {
                          ...prev.lifestyleInfo,
                          [key]: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  value
                )}
              </p>
            ))}
          </div>
        </section>
      </div>

      {/* Submit Button */}
      {isEditing && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={handleSubmit}
            className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg'
          >
            Save Changes
          </button>
        </div>
      )}
    </Container>
  );
};

export default PatientProfile;
