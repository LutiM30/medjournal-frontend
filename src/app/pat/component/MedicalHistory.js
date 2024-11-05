import React, { useState } from 'react';
import { FaFileMedical } from 'react-icons/fa';

const MedicalHistory = ({ onChange }) => {
  const [medicalConditions, setMedicalConditions] = useState('');
  const [pastSurgeries, setPastSurgeries] = useState('');
  const [allergies, setAllergies] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');

  const handleChange = () => {
    onChange({
      medicalConditions,
      pastSurgeries,
      allergies,
      currentMedications,
    });
  };

  return (
    <div className='mb-6 p-6 border border-blue-400 rounded-lg shadow-lg bg-blue-50'>
      <h2 className='text-2xl font-semibold mb-4 text-blue-600 flex items-center'>
        <FaFileMedical className='text-blue-600 mr-2' />
        Medical History
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='font-medium'>Current Medical Conditions:</label>
          <input
            type='text'
            value={medicalConditions}
            onChange={(e) => {
              setMedicalConditions(e.target.value);
              handleChange();
            }}
            className='border border-gray-300 p-2 w-full rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Past Surgeries and Dates:</label>
          <input
            type='text'
            value={pastSurgeries}
            onChange={(e) => {
              setPastSurgeries(e.target.value);
              handleChange();
            }}
            className='border border-gray-300 p-2 w-full rounded'
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
            className='border border-gray-300 p-2 w-full rounded'
          />
        </div>
        <div>
          <label className='font-medium'>Current Medications:</label>
          <input
            type='text'
            value={currentMedications}
            onChange={(e) => {
              setCurrentMedications(e.target.value);
              handleChange();
            }}
            className='border border-gray-300 p-2 w-full rounded'
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
