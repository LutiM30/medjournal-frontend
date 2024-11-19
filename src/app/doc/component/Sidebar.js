import React, { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { userAtom } from '@/lib/atoms/userAtom';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ErrorMessage from '@/components/ui/Elements/ErrorMesage';
import {
  PhoneNumberRules,
  AddressRules,
  SpecialtyRules,
  CityRules,
  ProvinceRules,
} from '@/lib/Rules';
import { api } from '@/lib/apis/api';
import { UPDATE_PHOTO_URL } from '@/lib/apis/apiUrls';
import { toast } from 'sonner';
import { capitalize } from 'radash';
import ProfilePictureHandler from '@/components/ProfilePictureHandler';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Sidebar = () => {
  const user = useAtomValue(userAtom);
  const [profile, setProfile] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [schedule, setSchedule] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        const profileData = user?.profile;
        if (profileData) {
          setProfile(profileData);
          setIsProfileComplete(profileData.isProfileComplete);

          !profileData?.isProfileComplete && setIsEditing(true);

          if (profileData.imageUrl) setImageUrl(user.photoURL);

          setValue('specialty', profileData.specialty);
          setValue('address', profileData.address);
          setValue('phonenumber', profileData.phonenumber);
          setSchedule(profileData.schedule || {});
        }
      }
    };
    fetchUserProfile();
  }, [user, isUploading]);

  const handleScheduleChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const uploadProfilePicture = async () => {
    if (!file) return;
    try {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      setIsUploading(false);
      return downloadUrl;
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const setPhotoURL = async () => {
    setIsUploading(true);
    const PROFILE_PICTURE_ERROR = 'Error saving profile picture: ';
    try {
      const downloadURL = await uploadProfilePicture();
      const res = await api(UPDATE_PHOTO_URL, { photoURL: downloadURL });
      toast[[200, 'success']?.includes(res.status) ? 'success' : 'error'](
        capitalize(res.status) || res.status,
        { description: res.message }
      );
      setImageUrl(downloadURL);
    } catch (error) {
      console.error(PROFILE_PICTURE_ERROR, error);
      toast.error(PROFILE_PICTURE_ERROR);
      throw error;
    }
    setIsUploading(false);
  };
  const onSubmit = async (data) => {
    if (!user?.role) {
      console.error('User role is not set or invalid.');
      toast.error('User role is missing. Please contact support.');
      return;
    }

    const profileData = {
      ...data,
      schedule,
      isProfileComplete: true,
      uid: user.uid,
    };

    try {
      const docRef = doc(db, user.role, user.uid);

      await setDoc(docRef, profileData, { merge: true });
      if (imageUrl) {
        await setPhotoURL();
      }
      setProfile(profileData);
      setIsProfileComplete(true);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile data:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className='p-6 mb-6 ml-6 text-center transition-transform duration-300 transform border-l-4 border-blue-500 rounded-lg profile-card card bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 dark:shadow-lg hover:scale-105 hover:shadow-xl dark:bg-slate-900'>
      <ProfilePictureHandler
        file={file}
        setFile={setFile}
        imageUrl={imageUrl}
        isEditing={isEditing}
        setImageUrl={setImageUrl}
      />
      <h2 className='text-2xl font-bold text-blue-700 transition-colors duration-300 hover:text-blue-600'>
        {user?.displayName || ''}
      </h2>
      {isProfileComplete && !isEditing ? (
        <>
          <p className='mb-1 text-lg text-purple-600'>
            Specialty:{' '}
            <span className='font-semibold text-blue-500 DARK:text-white'>
              {profile.specialty || 'General'}
            </span>
          </p>
          <hr className='my-4 border-gray-300' />

          {/* Address Section */}
          <div className='mb-4 text-left'>
            <h3 className='font-semibold text-purple-600 '>
              Practice Address:
            </h3>
            <p className='text-gray-700 dark:text-white'>
              {profile.address || '123 Abc St'}
            </p>
          </div>

          <div className='mb-4 text-left'>
            <h3 className='font-semibold text-purple-600'>City:</h3>
            <p className='text-gray-700 dark:text-white'>
              {profile.city || 'Toronto'}
            </p>
          </div>

          <div className='mb-4 text-left'>
            <h3 className='font-semibold text-purple-600'>Province:</h3>
            <p className='text-gray-700 dark:text-white'>
              {profile.province || 'Ontario'}
            </p>
          </div>

          <div className='mb-4 text-left'>
            <h3 className='font-semibold text-purple-600'>Office Phone:</h3>
            <p className='text-gray-700 dark:text-white'>
              {profile.phonenumber || '555-555-5555'}
            </p>
          </div>

          <Button
            onClick={() => setIsEditing(true)}
            className='px-4 py-2 mt-4 rounded bg-primary'
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className='animate-spin' /> : ''}
            Edit Profile
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-2xl font-bold text-blue-700'>
            {isProfileComplete ? 'Edit Your Profile' : 'Complete Your Profile'}
          </h2>

          <div className='my-4'>
            <label className='block text-left'>Specialty</label>
            <input
              className='w-full p-2 border rounded'
              {...register('specialty', SpecialtyRules)}
              placeholder='e.g., Cardiology'
            />
            {errors.specialty && (
              <ErrorMessage msg={errors.specialty.message} />
            )}
          </div>

          <div className='my-4'>
            <label className='block text-left'>Address</label>
            <input
              className='w-full p-2 border rounded'
              {...register('address', AddressRules)}
              placeholder='123 Main St'
            />
            {errors.address && <ErrorMessage msg={errors.address.message} />}
          </div>

          <div className='my-4'>
            <label className='block text-left'>City</label>
            <input
              className='w-full p-2 border rounded'
              {...register('city', CityRules)}
              placeholder='Toronto'
            />
            {errors.city && <ErrorMessage msg={errors.city.message} />}
          </div>

          <div className='my-4'>
            <label className='block text-left'>Province</label>
            <input
              className='w-full p-2 border rounded'
              {...register('province', ProvinceRules)}
              placeholder='Ontario'
            />
            {errors.province && <ErrorMessage msg={errors.province.message} />}
          </div>

          <div className='my-4'>
            <label className='block text-left'>Office Phone:</label>
            <input
              className='w-full p-2 border rounded'
              {...register('phonenumber', PhoneNumberRules)}
              placeholder='555-555-5555'
            />
            {errors.phonenumber && (
              <ErrorMessage msg={errors.phonenumber.message} />
            )}
          </div>

          {/* Schedule Input Section */}
          <h3 className="font-semibold text-purple-600 mt-4">Availability Schedule</h3>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
            <div key={day} className="my-2 flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) => handleScheduleChange(day, "enabled", e.target.checked)}
                checked={schedule[day]?.enabled || false}
              />
              <span className="w-20">{day}</span>
              <input
                type="time"
                className="p-1 border rounded"
                onChange={(e) => handleScheduleChange(day, "start", e.target.value)}
                value={schedule[day]?.start || ""}
                disabled={!schedule[day]?.enabled}
              />
              <span>to</span>
              <input
                type="time"
                className="p-1 border rounded"
                onChange={(e) => handleScheduleChange(day, "end", e.target.value)}
                value={schedule[day]?.end || ""}
                disabled={!schedule[day]?.enabled}
              />
            </div>
          ))}

          <Button
            type='submit'
            className='px-4 py-2 mt-4 rounded'
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className='animate-spin' /> : ''}
            {isProfileComplete ? 'Update Profile' : 'Save Profile'}
          </Button>

          {isProfileComplete && (
            <Button
              variant='secondary'
              className='px-4 py-2 mt-4 ml-2 rounded '
              onClick={() => setIsEditing(false)}
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className='animate-spin' /> : ''}
              Cancel
            </Button>
          )}
        </form>
      )}
    </div>
  );
};

export default Sidebar;
