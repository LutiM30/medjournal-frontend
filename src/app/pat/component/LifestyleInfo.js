import React, { useState, useEffect } from 'react';
import { FaCarrot } from 'react-icons/fa';

const LifestyleInfo = ({ onChange }) => {
  const [smokingStatus, setSmokingStatus] = useState('');
  const [alcoholConsumption, setAlcoholConsumption] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [dietPreference, setDietPreference] = useState(''); // New state for diet preference

  // Effect to handle changes in input fields
  useEffect(() => {
    onChange({
      smokingStatus,
      alcoholConsumption,
      exerciseFrequency,
      dietPreference,
    });
  }, [
    smokingStatus,
    alcoholConsumption,
    exerciseFrequency,
    dietPreference,
    onChange,
  ]);

  return (
    <div className='mb-6 p-6 border border-green-400 rounded-lg shadow-lg bg-green-50'>
      <h2 className='text-2xl font-semibold mb-4 text-green-600 flex items-center'>
        <FaCarrot className='text-green-600 mr-2' />
        Lifestyle Information
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='font-medium'>Smoking Status:</label>
          <input
            type='text'
            value={smokingStatus}
            onChange={(e) => setSmokingStatus(e.target.value)}
            className='border border-gray-300 p-2 w-full rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Alcohol Consumption:</label>
          <input
            type='text'
            value={alcoholConsumption}
            onChange={(e) => setAlcoholConsumption(e.target.value)}
            className='border border-gray-300 p-2 w-full rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Exercise Frequency:</label>
          <input
            type='text'
            value={exerciseFrequency}
            onChange={(e) => setExerciseFrequency(e.target.value)}
            className='border border-gray-300 p-2 w-full rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Diet Preference:</label>
          <input
            type='text'
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
            className='border border-gray-300 p-2 w-full rounded'
          />
        </div>
      </div>
    </div>
  );
};

export default LifestyleInfo;
