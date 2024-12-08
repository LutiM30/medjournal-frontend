import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { db, storage } from '@/lib/firebase'; // Ensure you import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const PersonalInfo = ({ onChange }) => {
  const user = useAtomValue(userAtom);

  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('Female');
  const [bloodgroup, setBloodGroup] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [othernotes, setOtherNotes] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [image, setImage] = useState(null); // To store the selected image file
  const [previewUrl, setPreviewUrl] = useState(null); // For previewing the image
  const [isImageUploaded, setIsImageUploaded] = useState(false); // To track image upload status

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        const [first, last] = user.displayName.split(' ');
        setFirstName(first);
        setLastName(last);
      }
    }
    onChange({
      firstname,
      lastname,
      birthdate,
      gender,
      bloodgroup,
      height,
      weight,
      othernotes,
    });
  }, [
    user,
    firstname,
    lastname,
    birthdate,
    gender,
    bloodgroup,
    height,
    weight,
    othernotes,
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Set preview URL for display
    }
  };

  const uploadImage = async () => {
    if (!user || !user.uid || !image) {
      alert('No image selected or user not authenticated.');
      return;
    }

    const imageRef = ref(storage, `profileImages/${user.uid}`);
    try {
      // Upload the image to Firebase Storage
      await uploadBytes(imageRef, image);

      // Get the download URL
      const imageUrl = await getDownloadURL(imageRef);

      // Update Firestore with the image URL
      const userDoc = doc(db, 'patients', user.uid);
      await updateDoc(userDoc, { profileImageUrl: imageUrl });

      alert('Profile image uploaded successfully!');
      setIsImageUploaded(true); // Update state to hide the button
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('There was an error uploading your image. Please try again.');
    }
  };

  return (
    <div className='flex flex-col p-6 mb-6 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-200 to-green-200'>
      <div className='flex items-start mb-4'>
        <div className='relative w-32 h-32 mr-6 overflow-hidden border-4 border-gray-500 rounded-full shadow-md'>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt='Patient Profile Picture'
              layout='fill'
              objectFit='cover'
            />
          ) : (
            <FaUser className='w-full h-full text-gray-600' />
          )}
        </div>
        <div className='flex flex-col'>
          <label className='mb-2 font-medium text-gray-700'>Upload Image:</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='p-2 border-2 border-gray-400 rounded-lg'
          />
          {!isImageUploaded && (
            <button
              onClick={uploadImage}
              className='px-4 py-2 mt-4 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600'
            >
              Save Image
            </button>
          )}
        </div>
      </div>
      <div>
        <h2 className='flex items-center text-2xl font-semibold text-gray-800'>
          <FaUser className='mr-2 text-gray-600' /> Personal Information
        </h2>
        <div className='grid grid-cols-4 gap-4 mt-4'>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>First Name:</label>
            <input
              type='text'
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className='p-2 border-2 border-gray-400 rounded-lg'
              placeholder='Enter First Name'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>Last Name:</label>
            <input
              type='text'
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className='p-2 border-2 border-gray-400 rounded-lg'
              placeholder='Enter Last Name'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>Birthdate:</label>
            <input
              type='date'
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className='p-2 border-2 border-gray-400 rounded-lg'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className='p-2 border-2 border-gray-400 rounded-lg'
            >
              <option value='Female'>Female</option>
              <option value='Male'>Male</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>Blood Group:</label>
            <input
              type='text'
              value={bloodgroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className='p-2 border-2 border-gray-400 rounded-lg'
              placeholder='Enter Blood Group'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>Height (cm):</label>
            <input
              type='number'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className='p-2 border-2 border-gray-400 rounded-lg'
              placeholder='Enter Height'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700'>Weight (kg):</label>
            <input
              type='number'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className='p-2 border-2 border-gray-400 rounded-lg'
              placeholder='Enter Weight'
            />
          </div>
          <div className='flex flex-col col-span-4'>
            <label className='font-medium text-gray-700'>Other Notes:</label>
            <textarea
              value={othernotes}
              onChange={(e) => setOtherNotes(e.target.value)}
              className='p-2 border-2 border-gray-400 rounded-lg'
              placeholder='Additional information (optional)'
              rows='3'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
