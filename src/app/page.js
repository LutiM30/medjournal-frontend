// Homepage
import { ImagesSliderHome } from '../components/ui/imageSlider';
import { Features } from '@/components/Features';
import { DoctorsListCard } from '@/components/doctors';
export default function Home() {
  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <ImagesSliderHome />
        <div className='overflow-hidden h-full w-full relative flex items-center justify-center z-50 flex flex-col justify-center items-center'>
          <h1 className='font-bold text-xl md:text-4xl text-center bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">'>
            Our Features
          </h1>
        </div>
        <Features />
        <DoctorsListCard />
      </main>
    </div>
  );
}
