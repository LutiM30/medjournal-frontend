'use client';
import { api } from '@/lib/apis/api';
import { GET_USERS } from '@/lib/apis/apiUrls';
import { GET_USER_NAME_ROLE } from '@/lib/constants';
import React, { useEffect } from 'react';

function page() {
  const getUsersData = async () => {
    const userIDs = ['0u9ciqoSPDaimKyXGdZsJmXCshG3'];

    const params = {
      ids: userIDs?.toString(),
    };

    const response = await api(GET_USERS, {}, '', params);

    const users = response.data.users?.map((user) => GET_USER_NAME_ROLE(user));
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return <div>Doctors List</div>;
}

export default page;
