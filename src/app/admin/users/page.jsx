'use client';
// users/page.jsx
import React, { useEffect, useState } from 'react';
import DataTable from './data-table';
import { GET_ALL_USERS } from '@/lib/apis/apiUrls';
import { api } from '@/lib/apis/api';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { isLoadingAtom } from '@/lib/atoms/atoms';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageTokens, setPageTokens] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const user = useAtomValue(userAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    if (user?.accessToken && !isLoading) {
      const setUsersData = async () => {
        setIsLoading(true);
        try {
          const result = await getUsersData(currentPage);
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
  }, [user, currentPage]);

  const handleNextPage = () =>
    hasNextPage ? setCurrentPage((prev) => prev + 1) : null;

  const handlePreviousPage = () =>
    currentPage > 0 ? setCurrentPage((prev) => prev - 1) : null;

  return (
    <div className='container p-4 mx-auto my-8'>
      {users?.length ? (
        <DataTable
          data={users}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          pageTokens={pageTokens}
          hasNextPage={hasNextPage}
        />
      ) : (
        <div className='py-4 text-center'>
          Unable to load users data. Please try again later.
        </div>
      )}
    </div>
  );
};

const getUsersData = async (page) => {
  try {
    const response = await api(GET_ALL_USERS, '', '', { page });

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
