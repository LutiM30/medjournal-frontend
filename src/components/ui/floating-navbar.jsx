'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/modeToggler';
import AuthNavBarButton from '@/components/ui/AuthNavBarButton';
import { IconHome, IconWorld } from '@tabler/icons-react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import Logo from '../Logo';

import useRouteProtection from '@/lib/hooks/useRouteProtection';
import useNavigationVisibility from '@/lib/hooks/useNavigationVisibility';
import { USER_ROLES_ROUTES } from '@/lib/constants';
import { usePathname } from 'next/navigation';

/**
 * FloatingNav component with route protection
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
export const FloatingNav = ({ className }) => {
  const user = useAtomValue(userAtom);
  const pathName = usePathname();

  // Use custom hooks
  useRouteProtection({ pathName });
  const { visible } = useNavigationVisibility();

  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <IconHome className='w-4 h-4 text-neutral-500 dark:text-white' />,
    },
    {
      name: 'About Us',
      link: '/about',
      icon: <IconWorld className='w-4 h-4 text-neutral-500 dark:text-white' />,
    },
    ...(USER_ROLES_ROUTES[user?.role] || []),
  ];
  const navWidthClass = user?.uid ? 'w-[70%]' : 'w-[70%]';

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 0.8 : 0,
        }}
        whileHover={{
          opacity: visible ? 1 : 0,
          transition: {
            duration: 1,
            ease: [0.2, 1.01, 0.5, 0.71],
          },
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          `flex fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-primary-foreground bg-primary-foreground shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-2 items-center justify-between
          ${navWidthClass}`,
          className
        )}
      >
        {/* Left Side - Logo */}
        <div className='flex-shrink-0'>
          <div className='text-xl font-bold'>
            {/* <Logo /> */}
            <>
              <span className='block sm:hidden'>
                <img
                  src='/favicon.svg'
                  // src="/favicon.svg dark:/favicon-dark.svg"
                  alt='Logo'
                  className='w-6 h-6 border-2 rounded-full'
                />
              </span>
              <span className='hidden text-sm sm:block'>
                <Logo />
              </span>
            </>
          </div>
        </div>

        {/* Middle - Navigation Links */}
        <div className='flex items-center justify-center space-x-4'>
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                'relative font-bold text-lg dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500'
              )}
            >
              <span className='block sm:hidden'>{navItem.icon}</span>
              <span className='hidden text-sm sm:block'>{navItem.name}</span>
            </Link>
          ))}
        </div>

        {/* Right Side - Auth Button and Mode Toggle */}
        <div className='flex items-center space-x-2'>
          <AuthNavBarButton />
          <ModeToggle />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
