import React, { useState } from 'react';
import { FaFileMedical } from 'react-icons/fa';

const MedicalHistory = ({ onChange }) => {
  const [medicalconditions, setMedicalConditions] = useState('');
  const [pastsurgeries, setPastSurgeries] = useState('');
  const [allergies, setAllergies] = useState('');
  const [currentmedications, setCurrentMedications] = useState('');

  const handleChange = () => {
    onChange({
      medicalconditions,
      pastsurgeries,
      allergies,
      currentmedications,
    });
  };

  return (
    <div className='p-6 mb-6 border border-blue-400 rounded-lg shadow-lg bg-blue-50'>
      <h2 className='flex items-center mb-4 text-2xl font-semibold text-blue-600'>
        <FaFileMedical className='mr-2 text-blue-600' />
        Medical History
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='font-medium'>Current Medical Conditions:</label>
          <input
            type='text'
            value={medicalconditions}
            onChange={(e) => {
              setMedicalConditions(e.target.value);
              handleChange();
            }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Past Surgeries and Dates:</label>
          <input
            type='text'
            value={pastsurgeries}
            onChange={(e) => {
              setPastSurgeries(e.target.value);
              handleChange();
            }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Allergies:</label>
          <input
            type='text'
            value={allergies}
            onChange={(e) => {
              setAllergies(e.target.value);
              handleChange();
            }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Current Medications:</label>
          <input
            type='text'
            value={currentmedications}
            onChange={(e) => {
              setCurrentMedications(e.target.value);
              handleChange();
            }}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
