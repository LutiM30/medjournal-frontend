'use client';
import { ImagesSliderHome } from '../components/ui/imageSlider';
import { Features } from '@/components/Features';
import { DoctorsListCard } from '@/components/doctors';
export default function Home() {
  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <ImagesSliderHome />
        <Features />
        <DoctorsListCard />
      </main>
    </div>
  );
}
