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
    <div className='p-6 mb-6 transition-transform duration-300 border border-green-400 rounded-lg shadow-lg dark:bg-slate-900 bg-green-50 hover:shadow-xl'>
      <h2 className='flex items-center mb-4 text-2xl font-semibold text-green-600'>
        <FaCarrot className='mr-2 text-green-600' />
        Lifestyle Information
      </h2>
      <div className='space-y-4'>
        <div className='flex items-center'>
          <FaSmoking className='mr-2 text-green-600' />
          <div>
            <label className='font-medium'>Smoking Status:</label>
            <p className='text-white-700'>Non-Smoker</p>
          </div>
        </div>
        <div className='flex items-center'>
          <FaBeer className='mr-2 text-green-600' />
          <div>
            <label className='font-medium'>Alcohol Consumption:</label>
            <p className='text-white-700'>Occasional</p>
          </div>
        </div>
        <div className='flex items-center'>
          <FaDumbbell className='mr-2 text-green-600' />
          <div>
            <label className='font-medium'>Exercise Habits:</label>
            <p className='text-white-700'>3 times a week</p>
          </div>
        </div>
        <div className='flex items-center'>
          <FaCarrot className='mr-2 text-green-600' />
          <div>
            <label className='font-medium'>
              Diet Restrictions/Preferences:
            </label>
            <p className='text-white-700'>Vegetarian</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleInfo;
