import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaBriefcaseMedical, FaClipboardList } from 'react-icons/fa';

const DisplayPatientProfile = () => {
  const user = useAtomValue(userAtom);
  const [patientData, setPatientData] = useState({
    personalInfo: {},
    medicalHistory: {},
    lifestyleInfo: {},
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {},
    medicalHistory: {},
    lifestyleInfo: {},
  });
  const [profileImage, setProfileImage] = useState(null);

  // Fetch patient data from Firestore
  useEffect(() => {
    const fetchPatientData = async () => {
      if (!user || !user.uid) return;
      const patientDocRef = doc(db, 'patients', user.uid);
      const docSnap = await getDoc(patientDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileImage(data.profileImageUrl); // updated field
        setPatientData({
          personalInfo: {
            firstName: data.firstname,
            lastName: data.lastname,
            birthdate: data.birthdate,
            gender: data.gender,
            bloodGroup: data.bloodgroup,
            height: data.height,
            weight: data.weight,
            otherNotes: data.othernotes,
          },
          medicalHistory: {
            allergies: data.allergies,
            currentMedications: data.currentmedications,
            medicalConditions: data.medicalconditions,
            pastSurgeries: data.pastsurgeries,
          },
          lifestyleInfo: {
            dietPreference: data.dietpreference,
            exerciseFrequency: data.exercisefrequency,
            smokingStatus: data.smokingstatus,
            alcoholConsumption: data.alcoholconsumption,
          },
        });
        setFormData({
          personalInfo: {
            FirstName: data.firstname,
            LastName: data.lastname,
            BirthDate: data.birthdate,
            Gender: data.gender,
            BloodGroup: data.bloodgroup,
            Height: data.height,
            Weight: data.weight,
            OtherNotes: data.othernotes,
          },
          medicalHistory: {
            Allergies: data.allergies,
            CurrentMedications: data.currentmedications,
            MedicalConditions: data.medicalconditions,
            PastSurgeries: data.pastsurgeries,
          },
          lifestyleInfo: {
            DietPreference: data.dietpreference,
            ExerciseFrequency: data.exercisefrequency,
            SmokingStatus: data.smokingstatus,
            AlcoholConsumption: data.alcoholconsumption,
          },
        });
      }
    };

    fetchPatientData();
  }, [user]);

  const handleEdit = () => setEditMode(true);

  const handleChange = (section, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!user || !user.uid) return;

    try {
      const patientDocRef = doc(db, 'patients', user.uid);

      // Prepare an object to store the update data
      const updateData = {};

      // Normalize field names to avoid case issues
      const normalizeField = (fieldName) => fieldName.toLowerCase();

      // Define allowed fields based on the fields present in Firestore
      const allowedFields = [
        'firstname',
        'lastname',
        'birthdate',
        'gender',
        'bloodgroup',
        'height',
        'weight',
        'othernotes',
        'allergies',
        'currentmedications',
        'medicalconditions',
        'pastsurgeries',
        'dietpreference',
        'exercisefrequency',
        'smokingstatus',
        'alcoholconsumption',
      ];

      // Loop through each section and field to update only the fields that exist in Firestore
      Object.entries(formData).forEach(([section, fields]) => {
        Object.entries(fields).forEach(([key, value]) => {
          const normalizedKey = normalizeField(key);
          if (
            allowedFields.some(
              (field) => normalizeField(field) === normalizedKey
            )
          ) {
            updateData[normalizedKey] = value; // Only add fields that are allowed
          }
        });
      });

      // Update only the fields that have changed
      if (Object.keys(updateData).length > 0) {
        await updateDoc(patientDocRef, updateData);
        setPatientData(formData);
        setEditMode(false);
      } else {
        console.log('No fields to update.');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div className='relative flex flex-col h-screen pt-16 bg-center bg-cover'>
      <div className='flex flex-grow bg-white dark:bg-slate-900 bg-opacity-80'>
        <main className='flex-grow p-4'>
          <div className='mt-8'>
            {/* Personal Information Section */}
            <section className='mb-8 border p-6 rounded-lg bg-blue-100 shadow-sm'>
              <h2 className='text-2xl font-bold text-blue-700 flex items-center justify-between'>
                <span className='flex items-center'>
                  <img
                    src={profileImage} // Display profile image
                    alt='Profile'
                    className='w-12 h-12 rounded-full mr-2'
                  />
                  Personal Information
                </span>
              </h2>
              <div className='mt-4 grid grid-cols-2 gap-4 text-gray-800'>
                {Object.entries(formData.personalInfo).map(([key, value]) => (
                  <div key={key}>
                    {editMode ? (
                      <div>
                        <label className='block text-sm font-medium text-gray-600'>
                          {key.replace(/([A-Z])/g, ' $1')}:
                        </label>
                        <input
                          type='text'
                          value={value}
                          onChange={(e) =>
                            handleChange('personalInfo', key, e.target.value)
                          }
                          className='mt-1 block w-full border rounded-md p-2'
                        />
                      </div>
                    ) : (
                      <p>
                        <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>
                        {value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Medical History and Lifestyle Information Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Medical History Section */}
              <section className='border p-6 rounded-lg bg-green-100 shadow-sm'>
                <h2 className='text-2xl font-bold text-green-700 flex items-center justify-between'>
                  <span className='flex items-center'>
                    <FaBriefcaseMedical className='mr-2' /> Medical History
                  </span>
                </h2>
                <div className='mt-4 grid grid-cols-1 gap-4 text-gray-800'>
                  {Object.entries(formData.medicalHistory).map(
                    ([key, value]) => (
                      <div key={key}>
                        {editMode ? (
                          <div>
                            <label className='block text-sm font-medium text-gray-600'>
                              {key.replace(/([A-Z])/g, ' $1')}:
                            </label>
                            <input
                              type='text'
                              value={value}
                              onChange={(e) =>
                                handleChange(
                                  'medicalHistory',
                                  key,
                                  e.target.value
                                )
                              }
                              className='mt-1 block w-full border rounded-md p-2'
                            />
                          </div>
                        ) : (
                          <p>
                            <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>
                            {value}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Lifestyle Information Section */}
              <section className='border p-6 rounded-lg bg-yellow-100 shadow-sm'>
                <h2 className='text-2xl font-bold text-yellow-700 flex items-center justify-between'>
                  <span className='flex items-center'>
                    <FaClipboardList className='mr-2' /> Lifestyle Information
                  </span>
                </h2>
                <div className='mt-4 grid grid-cols-1 gap-4 text-gray-800'>
                  {Object.entries(formData.lifestyleInfo).map(
                    ([key, value]) => (
                      <div key={key}>
                        {editMode ? (
                          <div>
                            <label className='block text-sm font-medium text-gray-600'>
                              {key.replace(/([A-Z])/g, ' $1')}:
                            </label>
                            <input
                              type='text'
                              value={value}
                              onChange={(e) =>
                                handleChange(
                                  'lifestyleInfo',
                                  key,
                                  e.target.value
                                )
                              }
                              className='mt-1 block w-full border rounded-md p-2'
                            />
                          </div>
                        ) : (
                          <p>
                            <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>
                            {value}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Save or Edit button */}
          {editMode ? (
            <button
              onClick={handleSave}
              className='mt-6 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md'
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className='mt-6 px-4 py-2 text-white bg-gray-500 hover:bg-gray-700 rounded-md'
            >
              Edit Profile
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default DisplayPatientProfile;
