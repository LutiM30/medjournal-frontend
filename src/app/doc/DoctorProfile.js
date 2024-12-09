import React from 'react';

import Sidebar from './component/Sidebar';
import Overview from './component/Overview';
import Services from './component/Services';
import Reviews from './component/Reviews';
import Button from './component/Button';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';

const DoctorProfilePage = () => {
  return (
    <div>
      <div className='flex flex-col pt-20'>
        <div className='flex flex-grow'>
          <Sidebar />
          <main className='flex-grow p-4'>
            <Overview />
            <Services />
            <Reviews />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
