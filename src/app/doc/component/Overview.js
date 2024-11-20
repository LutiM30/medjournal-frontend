import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { userAtom } from '@/lib/atoms/userAtom';
import getProfileData from '@/lib/functions/Firestore/getProfileData';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import ErrorMessage from '@/components/ui/Elements/ErrorMesage';

const Overview = () => {
  const user = useAtomValue(userAtom);
  const [profile, setProfile] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        const profileDoc = await getProfileData(user.uid, user.role || 'users');
        const profileData = profileDoc?.data();
        if (profileData) {
          setProfile(profileData);
          setIsProfileComplete(profileData.isProfileComplete);

          // Set form default values when profile data is fetched
          setValue('yearsOfExperience', profileData.yearsOfExperience);
          setValue('currentRole', profileData.currentRole);
          setValue(
            'hospitalAffiliations',
            profileData.hospitalAffiliations?.join(', ')
          );
          setValue('clinicName', profileData.clinicName);
          setValue('primarySpecialty', profileData.primarySpecialty);
          setValue('subspecialties', profileData.subspecialties?.join(', '));
          setValue('procedures', profileData.procedures?.join(', '));
          setValue(
            'ageGroupsTreated',
            profileData.ageGroupsTreated?.join(', ')
          );
          setValue(
            'specificPatientGroups',
            profileData.specificPatientGroups?.join(', ')
          );
          setValue(
            'technologiesProficient',
            profileData.technologiesProficient?.join(', ')
          );
        }
      }
    };
    fetchUserProfile();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const profileData = {
      ...data,
      hospitalAffiliations: data.hospitalAffiliations
        .split(',')
        .map((item) => item.trim()),
      subspecialties: data.subspecialties.split(',').map((item) => item.trim()),
      procedures: data.procedures.split(',').map((item) => item.trim()),
      ageGroupsTreated: data.ageGroupsTreated
        .split(',')
        .map((item) => item.trim()),
      specificPatientGroups: data.specificPatientGroups
        .split(',')
        .map((item) => item.trim()),
      technologiesProficient: data.technologiesProficient
        .split(',')
        .map((item) => item.trim()),
      isProfileComplete: true,
      uid: user.uid,
    };

    try {
      const docRef = doc(db, user.role || 'users', user.uid);
      await setDoc(docRef, profileData, { merge: true });
      setProfile(profileData);
      setIsProfileComplete(true);
      setIsEditing(false); // Exit editing mode after saving
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const doctorProfile = profile || {
    yearsOfExperience: 15,
    currentRole: 'Consultant',
    hospitalAffiliations: ['General Hospital', "St. Michael's Hospital"],
    clinicName: 'Downtown Health Clinic',
    primarySpecialty: 'Cardiology',
    subspecialties: ['Interventional Cardiology', 'Heart Failure'],
    procedures: ['Angioplasty', 'Cardiac Catheterization'],
    ageGroupsTreated: ['Adult', 'Geriatric'],
    specificPatientGroups: ['Cardiac patients', 'Post-surgical patients'],
    technologiesProficient: ['Echocardiography', 'Cardiac MRI'],
  };

  return (
    <div className='max-w-4xl p-6 mx-auto mb-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg dark:bg-slate-900'>
      <h2 className='mb-4 text-2xl font-semibold text-blue-600'>
        Doctor Profile
      </h2>
      <hr className='my-4' />

      {isProfileComplete && !isEditing ? (
        <>
          <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
            <div>
              <h3 className='font-semibold text-purple-600'>
                Years of Experience:
              </h3>
              <p>{doctorProfile.yearsOfExperience} years</p>
            </div>
            <div>
              <h3 className='font-semibold text-purple-600'>Current Role:</h3>
              <p>{doctorProfile.currentRole}</p>
            </div>
            <div>
              <h3 className='font-semibold text-purple-600'>
                Hospital Affiliations:
              </h3>
              <p>{doctorProfile.hospitalAffiliations?.join(', ')}</p>
            </div>
            <div>
              <h3 className='font-semibold text-purple-600'>Clinic Name:</h3>
              <p>{doctorProfile.clinicName}</p>
            </div>
          </div>
          <hr className='my-4' />
          <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
            <div>
              <h3 className='font-semibold text-purple-600'>
                Primary Specialty:
              </h3>
              <p>{doctorProfile.primarySpecialty}</p>
            </div>
            <div>
              <h3 className='font-semibold text-purple-600'>Subspecialties:</h3>
              <p>{doctorProfile.subspecialties?.join(', ')}</p>
            </div>
          </div>
          <hr className='my-4' />
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <h3 className='font-semibold text-purple-600'>
                Procedures Offered:
              </h3>
              <p>{doctorProfile.procedures?.join(', ')}</p>
            </div>
            <div>
              <h3 className='font-semibold text-purple-600'>
                Age Groups Treated:
              </h3>
              <p>{doctorProfile.ageGroupsTreated?.join(', ')}</p>
            </div>
            <div>
              <h3 className='font-semibold text-purple-600'>
                Specialized Patient Groups:
              </h3>
              <p>{doctorProfile.specificPatientGroups?.join(', ')}</p>
            </div>
            <div>
              <h3 className='font-semibold text-purple-600'>
                Medical Technologies/Techniques:
              </h3>
              <p>{doctorProfile.technologiesProficient?.join(', ')}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className='px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600'
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Years of Experience
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('yearsOfExperience', { required: true })}
                placeholder='Years of Experience'
                type='number'
              />
              {errors.yearsOfExperience && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Current Role
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('currentRole', { required: true })}
                placeholder='Current Role'
              />
              {errors.currentRole && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Hospital Affiliations
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('hospitalAffiliations', { required: true })}
                placeholder='Comma-separated list of hospital affiliations'
              />
              {errors.hospitalAffiliations && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Clinic Name
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('clinicName', { required: true })}
                placeholder='Clinic Name'
              />
              {errors.clinicName && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
          </div>

          {/* Additional fields for Specialty, Subspecialties, etc. */}
          <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Primary Specialty
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('primarySpecialty', { required: true })}
                placeholder='Primary Specialty'
              />
              {errors.primarySpecialty && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Subspecialties
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('subspecialties', { required: true })}
                placeholder='Comma-separated list of subspecialties'
              />
              {errors.subspecialties && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
          </div>

          {/* Additional fields for Procedures, Age Groups, etc. */}
          <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Procedures Offered
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('procedures', { required: true })}
                placeholder='Comma-separated list of procedures'
              />
              {errors.procedures && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Age Groups Treated
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('ageGroupsTreated', { required: true })}
                placeholder='Comma-separated list of age groups treated'
              />
              {errors.ageGroupsTreated && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Specialized Patient Groups
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('specificPatientGroups', { required: true })}
                placeholder='Comma-separated list of patient groups'
              />
              {errors.specificPatientGroups && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
            <div>
              <label className='block font-semibold text-left text-purple-600'>
                Medical Technologies/Techniques
              </label>
              <input
                className='w-full p-2 border rounded'
                {...register('technologiesProficient', { required: true })}
                placeholder='Comma-separated list of technologies'
              />
              {errors.technologiesProficient && (
                <ErrorMessage msg='This field is required.' />
              )}
            </div>
          </div>

          <button
            type='submit'
            className='px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600'
          >
            {isProfileComplete ? 'Update Profile' : 'Save Profile'}
          </button>

          {isProfileComplete && (
            <button
              type='button'
              onClick={() => setIsEditing(false)}
              className='px-4 py-2 mt-4 ml-2 text-white bg-gray-500 rounded hover:bg-gray-600'
            >
              Cancel
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Overview;
