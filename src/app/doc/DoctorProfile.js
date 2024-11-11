import React from 'react';

import Sidebar from './component/Sidebar';
import Overview from './component/Overview';
import Services from './component/Services';
import Reviews from './component/Reviews';
import Button from './component/Button';
import { Footer } from '@/components/ui/footer'; // Use named import and correct casing

const DoctorProfilePage = () => {
  return (
    <div className='relative'>
      <div className='flex flex-col h-screen pt-20'>
        <div className='flex flex-grow'>
          <Sidebar />
          <main className='flex-grow p-4'>
            <Overview />
            <Services />
            <Reviews />
            <div className='text-center flex justify-center space-x-4'>
              <Button>Send Message</Button>
              <Button variant='primary'>Make Appointment</Button>
            </div>
          </main>
        </div>
        <Footer /> 
      </div>
    </div>
  );
};

export default DoctorProfilePage;
