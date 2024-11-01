import React from 'react';
import { Comfortaa } from 'next/font/google';
import { cn, projectConstants } from '@/lib/utils';
import Link from 'next/link';

const logoFont = Comfortaa({ weight: '700', subsets: ['latin'] });

const Logo = () => {
  return (
    <Link
      href={'/'}
      className={cn(logoFont.className, 'pl-4', 'text-2xl', 'tracking-wide')}
    >
      {projectConstants.PROJECT_NAME}.
    </Link>
  );
};

export default Logo;
