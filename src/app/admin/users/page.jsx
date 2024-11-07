'use client';
// users/page.jsx
import React, { useEffect, useState } from 'react';
import DataTable from './data-table';
import GET_ALL_USERS from '@/lib/apis/GET_ALL_USERS';
import { api } from '@/lib/apis/api';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { isLoadingAtom } from '@/lib/atoms/atoms';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageTokens, setPageTokens] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const toggle = () => setTrigger((trigger) => !trigger);
  const user = useAtomValue(userAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    if (user?.accessToken && !isLoading) {
      const setUsersData = async () => {
        setIsLoading(true);
        try {
          const result = await getUsersData(currentPage, search);
          if (result) {
            const { users, pageTokens, hasNextPage } = result;
            setPageTokens(pageTokens);
            setUsers(users?.length ? users : []);
            setHasNextPage(hasNextPage);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
        setIsLoading(false);
      };

      setUsersData();
    }
  }, [user, currentPage, search, trigger]);

  const handleNextPage = () =>
    hasNextPage ? setCurrentPage((prev) => prev + 1) : null;

  const handlePreviousPage = () =>
    currentPage > 0 ? setCurrentPage((prev) => prev - 1) : null;

  return (
    <div className='container p-4 mx-auto my-8'>
      <div className='w-full max-w-screen-xl p-4 mx-auto my-8 bg-white shadow-lg md:p-8 dark:bg-black rounded-xl'>
        <DataTable
          data={users}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          pageTokens={pageTokens}
          hasNextPage={hasNextPage}
          setSearch={setSearch}
          search={search}
          setCurrentPage={setCurrentPage}
          trigger={toggle}
        />
      </div>
    </div>
  );
};

/**
 * This function asynchronously fetches user data based on a specified page and search criteria using
 * an API call.
 * @returns The `getUsersData` function returns an object with the following properties:
 * - `users`: An array of users data fetched from the API response, defaulting to an empty array if not
 * present.
 * - `pageTokens`: An array of page tokens fetched from the API response, defaulting to an empty array
 * if not present.
 * - `hasNextPage`: A boolean indicating whether there is a next
 */
const getUsersData = async (page, search) => {
  try {
    const response = await api(GET_ALL_USERS, {
      search,
      page,
    });

    if (response.data.error && response.data.message === 'Invalid Page') {
      getUsersData(page - 1, search);
    }

    return {
      users: response?.data?.users || [],
      pageTokens: response?.data?.pageTokens || [],
      hasNextPage: response?.data?.hasNextPage || false,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
};

export default Users;
