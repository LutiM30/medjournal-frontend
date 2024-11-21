'use client';
import React, { useEffect, useState } from 'react';
import PatientList from '../PatientList';
import AfterLoadingIsCompleted from '@/components/AfterLoadingIsCompleted';
import useGetAllUsers from '@/lib/hooks/useGetAllUsers';
import { ADMIN_ROLE } from '@/lib/constants';
import { capitalize } from 'radash';

const Patients = () => {
  const {
    users,
    setSearch,
    search,
    setCurrentPage,
    currentPage,
    trigger,
    hasNextPage,
    pageTokens,
  } = useGetAllUsers();
  const [placeholders, setPlaceholders] = useState([
    'Search',
    'Search John Doe...',
    'Search Hello World',
    'Search Tyler Durden',
  ]);
  const patientListProps = {
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

  /* This `useEffect` hook is responsible for updating the `placeholders` state based on the `users`
  states whenever `users` changes. Here's a breakdown of what it does: */
  useEffect(() => {
    if (users && users?.length) {
      const placeholdersArr = [];
      users.forEach((obj) => {
        /**
         * The function `getSearchStr` takes an optional string input and returns a formatted search
         * string.
         */
        const getSearchStr = (stringVar = '') => `Search ${stringVar}...`;
        const roleStr = capitalize(
          (!obj[`role`] ? '' : obj[`role`] === ADMIN_ROLE)
            ? 'Admin'
            : obj[`role`]
        );

        placeholdersArr.push(getSearchStr(capitalize(obj[`displayName`])));
        placeholdersArr.push(getSearchStr(roleStr));
      });

      setPlaceholders([...new Set(placeholdersArr)]);
    }
  }, [users]);

  return (
    <AfterLoadingIsCompleted>
      <PatientList {...patientListProps} />
    </AfterLoadingIsCompleted>
  );
};

export default Patients;
