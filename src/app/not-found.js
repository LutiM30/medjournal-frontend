import FloatingDiv from '@/components/ui/Effects/FloatingDiv';
import Starfield from '@/components/ui/Effects/StarfieldOriginal';
import { ShootingStars } from '@/components/ui/shooting-stars';

import { ASTRONAUT_IMAGE } from '@/lib/utils';
import Image from 'next/image';

const NotFound = () => {
  return (
    <>
      <div className='h-screen rounded-md  bg-neutral-900 flex flex-col items-center justify-center relative w-screen'>
        <h2 className='relative flex-col md:flex-col z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-slate-50 flex items-center gap-2 md:gap-8'>
          <span>Oops 404.</span>
          <FloatingDiv>
            <Image
              layout='fill'
              objectFit='contain'
              objectPosition='bottom right'
              alt='Lost astronaut'
              src={ASTRONAUT_IMAGE}
            />
          </FloatingDiv>
        </h2>
      </div>
      <Starfield />
      <ShootingStars />
    </>
    
  );
};

export default NotFound;
