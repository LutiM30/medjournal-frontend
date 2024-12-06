'use client';

import React, { useEffect, useState } from 'react';
import DoctorsList from './DoctorList';
import AfterLoadingIsCompleted from '@/components/AfterLoadingIsCompleted';
import useGetAllUsers from '@/lib/hooks/useGetAllUsers';
import { capitalize } from 'radash';

const Doctors = () => {
  const {
    users,
    setSearch,
    search,
    setCurrentPage,
    currentPage,
    trigger,
    hasNextPage,
    pageTokens,
  } = useGetAllUsers('doctor'); // Pass 'doctor' to filter the users by role

  const [placeholders, setPlaceholders] = useState([
    'Search Dr. Smith...',
    'Search Cardiologist...',
    'Search Dr. Lee...',
  ]);

  useEffect(() => {
    if (users && users?.length) {
      const placeholdersArr = [];
      users.forEach((obj) => {
        /**
         * Generate search placeholders dynamically.
         */
        const getSearchStr = (stringVar = '') => `Search ${stringVar}...`;
        placeholdersArr.push(getSearchStr(capitalize(obj[`displayName`])));
        placeholdersArr.push(getSearchStr(obj.profile?.specialization || ''));
      });

      setPlaceholders([...new Set(placeholdersArr)]);
    }
  }, [users]);

  const doctorListProps = {
    users,
    setSearch,
    search,
    setCurrentPage,
    currentPage,
    trigger,
    hasNextPage,
    pageTokens,
    placeholders,
  };

  return (
    <AfterLoadingIsCompleted>
      <DoctorsList {...doctorListProps} />
    </AfterLoadingIsCompleted>
  );
};

export default Doctors;
