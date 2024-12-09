'use client';

import React from 'react';
import { useAtomValue } from 'jotai';
import { isLoadingAtom } from '@/lib/atoms/atoms';
import VanishInput from '@/components/ui/placeholders-and-vanish-input';
import PaginationControls from '@/components/PaginationControls';
import ProfileViewer from '../../../components/DoctorProfileViewer';
import ProfilePictureHandler from '@/components/ProfilePictureHandler';

const DoctorsList = (props) => {
  const {
    users,
    setSearch,
    search,
    setCurrentPage,
    currentPage,
    hasNextPage,
    placeholders,
  } = props;

  const isLoading = useAtomValue(isLoadingAtom);

  const VanishInputProps = {
    placeholders,
    onChange: () => { },
    onSubmit: (e) => {
      setSearch([...search, e.target[0].value]);
      setCurrentPage(0);
    },
    search,
    setSearch,
    setCurrentPage,
  };

  return (
    <div className='max-w-6xl mx-auto mt-14 p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md'>
      {/* Page Title */}
      <h1 className='text-3xl font-semibold text-blue-700 mb-6'></h1>

      {/* Search Bar */}
      <div className='flex items-center mb-6'>
        <VanishInput {...VanishInputProps} />
      </div>

      {isLoading ? (
        <p className='text-center text-gray-500 dark:text-gray-400'>
          Loading doctors...
        </p>
      ) : users.length === 0 ? (
        <p className='text-center text-gray-500 dark:text-gray-400'>
          No doctors found.
        </p>
      ) : (
        <div>
          <div className='overflow-x-auto bg-white dark:bg-slate-800 shadow-md rounded-lg'>
            {/* Doctors Table */}
            <table className='w-full table-auto text-left text-gray-700 dark:text-gray-300'>
              <thead className='bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'>
                <tr>
                  {/* <th className='p-4'>Profile Picture</th> */}
                  <th className='p-4'>Name</th>
                  <th className='p-4'>Specialization</th>
                  <th className='p-4'>Experience</th>
                  <th className='p-4 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className='border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-slate-900'
                  >
                    {/* <td className='p-4'>
                      <ProfilePictureHandler
                        // file={file}
                        // setFile={setFile}
                        imageUrl={doctor?.photoURL || ''}
                        isEditing={false}
                      />
                      {doctor.imageUrl}
                    </td> */}
                    <td className='p-4'>{doctor.displayName}</td>
                    <td className='p-4'>{doctor.profile?.specialty}</td>
                    <td className='p-4'>
                      {doctor.profile?.yearsOfExperience} years
                    </td>
                    <td className='p-4 text-center'>
                      {/* Pass doctor data to ProfileViewer */}
                      <ProfileViewer doctor={doctor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className='flex justify-center mt-6'>
            <PaginationControls
              hasNextPage={hasNextPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
