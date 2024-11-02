import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { userAtom } from '@/lib/atoms/userAtom';
import getProfileData from '@/lib/functions/Firestore/getProfileData';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import defaultImage from './images/doc1.jpg'; // Default image
import ErrorMessage from '@/components/ui/Elements/ErrorMesage';
import { PhoneNumberRules, AddressRules, SpecialtyRules, CityRules, ProvinceRules } from '@/lib/Rules';

const Sidebar = () => {
  const user = useAtomValue(userAtom);
  const [profile, setProfile] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode
  const [imageUrl, setImageUrl] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        const profileDoc = await getProfileData(user.uid, user.role || 'users');
        const profileData = profileDoc?.data();
        if (profileData) {
          setProfile(profileData);
          setIsProfileComplete(profileData.isProfileComplete);
          if (profileData.imageUrl) setImageUrl(profileData.imageUrl);

          // Set form default values when profile data is fetched
          setValue('specialty', profileData.specialty);
          setValue('address', profileData.address);
          setValue('phonenumber', profileData.phonenumber);
        }
      }
    };
    fetchUserProfile();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const profileData = {
      ...data,
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore with the new image URL
      await setDoc(doc(db, user.role || 'users', user.uid), { imageUrl: downloadURL }, { merge: true });
      setImageUrl(downloadURL);
    }
  };

  return (
    <div className="profile-card card p-6 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-blue-500">
      {/* Profile Image Wrapper */}
      <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden mx-auto mb-4 shadow-md transition-transform duration-300 hover:rotate-3">
        <Image
          src={imageUrl || defaultImage}
          alt="Profile Image"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold text-blue-700 transition-colors duration-300 hover:text-blue-600">
        {user.displayName}
      </h2>
      {isProfileComplete && !isEditing ? (
        <>

          <p className="text-lg text-gray-600 mb-1">
            Specialty: <span className="text-blue-500 font-semibold">{profile.specialty || 'General'}</span>
          </p>
          <hr className="my-4 border-gray-300" />

          {/* Address Section */}
          <div className="mb-4 text-left">
            <h3 className="font-semibold text-purple-600">Practice Address:</h3>
            <p className="text-gray-700">{profile.address || '123 Abc St'}</p>
          </div>

          <div className="mb-4 text-left">
            <h3 className="font-semibold text-purple-600">City:</h3>
            <p className="text-gray-700">{profile.city || 'Toronto'}</p>
          </div>

          <div className="mb-4 text-left">
            <h3 className="font-semibold text-purple-600">Province:</h3>
            <p className="text-gray-700">{profile.province || 'Ontario'}</p>
          </div>

          <div className="mb-4 text-left">
            <h3 className="font-semibold text-purple-600">Office Phone:</h3>
            <p className="text-gray-700">{profile.phonenumber || '555-555-5555'}</p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-blue-700">{isProfileComplete ? 'Edit Your Profile' : 'Complete Your Profile'}</h2>

          <div className="my-4">
            <label className="block text-left">Specialty</label>
            <input
              className="w-full p-2 border rounded"
              {...register('specialty', SpecialtyRules)}
              placeholder="e.g., Cardiology"
            />
            {errors.specialty && <ErrorMessage msg={errors.specialty.message} />}
          </div>

          <div className="my-4">
            <label className="block text-left">Address</label>
            <input
              className="w-full p-2 border rounded"
              {...register('address', AddressRules)}
              placeholder="123 Main St"
            />
            {errors.address && <ErrorMessage msg={errors.address.message} />}
          </div>

          <div className="my-4">
            <label className="block text-left">City</label>
            <input
              className="w-full p-2 border rounded"
              {...register('city', CityRules)}
              placeholder="Toronto"
            />
            {errors.city && <ErrorMessage msg={errors.city.message} />}
          </div>

          <div className="my-4">
            <label className="block text-left">Province</label>
            <input
              className="w-full p-2 border rounded"
              {...register('province', ProvinceRules)}
              placeholder="Ontario"
            />
            {errors.province && <ErrorMessage msg={errors.province.message} />}
          </div>

          <div className="my-4">
            <label className="block text-left">Office Phone:</label>
            <input
              className="w-full p-2 border rounded"
              {...register('phonenumber', PhoneNumberRules)}
              placeholder="555-555-5555"
            />
            {errors.phonenumber && <ErrorMessage msg={errors.phonenumber.message} />}
          </div>

          <div className="my-4">
            <label className="block text-left">Upload Profile Image:</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={handleImageUpload}
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isProfileComplete ? 'Update Profile' : 'Save Profile'}
          </button>

          {isProfileComplete && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
            >
              Cancel
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Sidebar;
