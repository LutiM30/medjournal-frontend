'use client';
import Image from 'next/image';
import React from 'react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';

export function DoctorsListCard() {
  const cards = data.map((card, index) => (
    <Card
      key={card.src}
      card={card}
      index={index}
      className='object-cover'
      layout={true}
    />
  ));

  return (
    <div className='w-full h-full py-20'>
      <h2 className='max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans uppercase'>
        Top Doctors' Suggestions.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ src, availability }) => {
  return (
    <>
      <div
        key={'dummy-content'}
        className='bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4'
      >
        <Image
          src={src}
          alt='Macbook mockup from Aceternity UI'
          height='500'
          width='500'
          className='md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain'
        />
        <p className='text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto'>
          <span className='font-bold text-neutral-700'>Availibility :</span>{' '}
        </p>
        <p className='text-neutral-500 text-lg md:text-xl font-sans mt-4'>
          {availability}
        </p>
      </div>
    </>
  );
};

const data = [
  {
    category: 'Family Medicine',
    title: 'Dr. G. Gayle Stephens',
    src: 'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fjonathanborba-15770389.jpg?alt=media&token=b4b91e5f-02a2-45d5-aed4-31b780e92f6c',
    content: (
      <DummyContent
        src='https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fjonathanborba-15770389.jpg?alt=media&token=b4b91e5f-02a2-45d5-aed4-31b780e92f6c'
        availability='Monday - Friday: 10 AM - 5 PM, Weekends: Off'
      />
    ),
  },
  {
    category: 'Pediatricians',
    title: 'Dr. Benjamin Spock',
    src: 'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fmikhail-nilov-28123672.jpg?alt=media&token=43903ace-e1f9-4030-a7e5-0128b52387d9',
    content: (
      <DummyContent
        src='https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fmikhail-nilov-28123672.jpg?alt=media&token=43903ace-e1f9-4030-a7e5-0128b52387d9'
        availability='Weekends: 11 AM - 1 PM, Weekdays: Off'
      />
    ),
  },
  {
    category: 'General Pathology',
    title: 'Dr. Shvetsa',
    src: 'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fshvetsa-3902881.jpg?alt=media&token=543d4e22-a9a2-4cae-9c46-3045aff3af5e',
    content: (
      <DummyContent
        src='https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fshvetsa-3902881.jpg?alt=media&token=543d4e22-a9a2-4cae-9c46-3045aff3af5e'
        availability='Monday - Friday: 10 AM - 5 PM, Weekends: Off'
      />
    ),
  },

  {
    category: 'Cardiothoracic Surgery ',
    title: 'Dr. Tessy Asgbonome',
    src: 'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Ftessy-agbonome-521343232-18828741.jpg?alt=media&token=a8c83aa4-7a1d-4927-af78-0dd7bd1d4907',
    content: (
      <DummyContent
        src='https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Ftessy-agbonome-521343232-18828741.jpg?alt=media&token=a8c83aa4-7a1d-4927-af78-0dd7bd1d4907'
        availability='Weekends: 11 AM - 1 PM, Weekdays: Off'
      />
    ),
  },
  {
    category: 'Anesthesiology',
    title: 'Dr. Virginia Apgar',
    src: 'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fthirdman-5327585.jpg?alt=media&token=3e19785f-e05a-4d44-8973-ecd8ac291766',
    content: (
      <DummyContent
        src='https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fthirdman-5327585.jpg?alt=media&token=3e19785f-e05a-4d44-8973-ecd8ac291766'
        availability='Monday - Friday: 10 AM - 5 PM, Weekends: Off'
      />
    ),
  },
  {
    category: 'Occupational Medicine',
    title: 'Dr. Alice Hamilton',
    src: 'https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fjeff-denlea-721292-3714743.jpg?alt=media&token=8bb99685-0dff-48a4-afcd-60fc6c353655',
    content: (
      <DummyContent
        src='https://firebasestorage.googleapis.com/v0/b/capstone-bd303.appspot.com/o/Doctors%2Fjeff-denlea-721292-3714743.jpg?alt=media&token=8bb99685-0dff-48a4-afcd-60fc6c353655'
        availability='Weekends: 11 AM - 1 PM, Weekdays: Off'
      />
    ),
  },
];
