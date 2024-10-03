import React from 'react';
import { Wix_Madefor_Display } from 'next/font/google';
import { cn, projectConstants } from '@/lib/utils';
import Link from 'next/link';

const logoFont = Wix_Madefor_Display({ weight: '600', subsets: ['latin'] });

const Logo = () => {
  return (
    <Link href={'/'} className={cn(logoFont.className, 'pl-4')}>
      {projectConstants.PROJECT_NAME}
    </Link>
  );
};

export default Logo;
