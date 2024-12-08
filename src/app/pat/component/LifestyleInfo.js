import React, { useState } from 'react';
import { FaBeer, FaCarrot, FaDumbbell, FaSmoking } from 'react-icons/fa';

const LifestyleInfo = ({ onChange }) => {
  const [smokingstatus, setSmokingStatus] = useState('');
  const [alcoholconsumption, setAlcoholConsumption] = useState('');
  const [exercisefrequency, setExerciseFrequency] = useState('');
  const [dietpreference, setDietPreference] = useState('');

  const handleChange = () => {
    onChange({
      smokingstatus,
      alcoholconsumption,
      exercisefrequency,
      dietpreference,
    });
  };

  return (
    <div className='p-6 mb-6 transition-transform duration-300 border border-green-400 rounded-lg shadow-lg dark:bg-slate-900 bg-green-50 hover:shadow-xl'>
      <h2 className='flex items-center mb-4 text-2xl font-semibold text-green-600'>
        <FaCarrot className='mr-2 text-green-600' />
        Lifestyle Information
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='font-medium'>Smoking Status:</label>
          <input
            type='text'
            value={smokingstatus}
            onChange={(e) => {
              setSmokingStatus(e.target.value);
              handleChange();
            }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Alcohol Consumption:</label>
          <input
            type='text'
            value={alcoholconsumption}
            onChange={(e) => {
              setAlcoholConsumption(e.target.value);
              handleChange();
            }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Exercise Frequency:</label>
          <input
            type='text'
            value={exercisefrequency}
            onChange={(e) => {
              setExerciseFrequency(e.target.value);
              handleChange();
            }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Diet Restrictions/Preferences:</label>
          <input
            type='text'
            value={dietpreference}
            onChange={(e) => {
              setDietPreference(e.target.value);
              handleChange();
            }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
      </div>
    </div>
  );
};

export default LifestyleInfo;
