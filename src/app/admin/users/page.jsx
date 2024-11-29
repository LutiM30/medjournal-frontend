'use client';
// users/page.jsx
import React from 'react';
import DataTable from './data-table';
import useGetAllUsers from '@/lib/hooks/useGetAllUsers';

const Users = () => {
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

  return (
    <div className='container p-4 mx-auto my-8'>
      <div className='w-full max-w-screen-xl p-4 mx-auto my-8 bg-white shadow-lg md:p-8 dark:bg-black rounded-xl'>
        <DataTable
          data={users}
          currentPage={currentPage}
          pageTokens={pageTokens}
          hasNextPage={hasNextPage}
          setSearch={setSearch}
          search={search}
          setCurrentPage={setCurrentPage}
          trigger={trigger}
        />
      </div>
    </div>
  );
};

export default Users;
