'use client';
import React from 'react';
import { OurTeam } from '@/components/OurTeam';
import { ValuesAndVision } from '@/components/ValuesAndVision';

import { cn } from '@/lib/utils';

import { Boxes } from '@/components/ui/background-boxes';

import Footer from '@/components/ui/footer';
import { WhyWeBuild } from '@/components/WhyWeBuild';

const About = () => {
  return (
    <>
      <div className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div className='h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg mg-24'>
          <div className='absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none' />

          <Boxes />
          <h1
            className={cn(
              'md:text-4xl text-xl text-white relative z-20 uppercase border-b-2 pt-2 pb-2'
              // "border-black dark:border-white"
            )}
          >
            About Us
          </h1>
          <p className='text-justify mx-5 mt-2 text-neutral-300 relative z-0 row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 [&>p:text-lg] md:col-span-1 w-[370px] md:w-[470px] lg:w-[570px]'>
            "Our mission at Med Journal is to make healthcare records accessible
            and secure, allowing patients, doctors, and administrators to manage
            medical information with ease."
          </p>
        </div>
        <OurTeam />
        {/* Values and Vision Section */}
        <div className='overflow-hidden h-full w-full relative z-50 flex flex-col justify-center items-center'>
          <h1 className='font-bold text-xl md:text-4xl text-center bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-4'>
            Our Values and Vision
          </h1>

          <ValuesAndVision />
        </div>

        {/* Why We Built Section */}
        <div className='overflow-hidden h-full w-full relative z-50 flex flex-col justify-center items-center'>
          <h1 className='font-bold text-xl md:text-4xl text-center bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-4'>
            Why We Built Med Journal
          </h1>
          <WhyWeBuild />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
