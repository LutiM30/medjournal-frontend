"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/modeToggler';
import AuthNavBarButton from '@/components/ui/AuthNavBarButton';
import useFirebaseAuth from '@/lib/hooks/useFirebaseAuth';
import { IconHome, IconUser, IconWorld } from '@tabler/icons-react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import Logo from '../Logo';

export const FloatingNav = ({ className }) => {
  const { scrollY } = useScroll();
  const user = useAtomValue(userAtom);
  const pathName = usePathname();
  const router = useRouter();
  const isLoading = useAtomValue(isLoadingAtom);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!isLoading && pathName !== "/") {
      let isValidRoute = false;

      if (user?.uid && user?.token) {
        switch (user?.role) {
          case DOCTOR_ROLE:
            isValidRoute = DOCTOR_ROUTES?.includes(pathName);
            break;
          case PATIENT_ROLE:
            isValidRoute = PATIENT_ROUTES?.includes(pathName);
            break;
          case ADMIN_ROLE:
            isValidRoute = user.isAdmin && ADMIN_ROUTES?.includes(pathName);
            break;
        }

        if (AUTH_PUBLIC_ROUTES?.includes(pathName)) {
          isValidRoute = true;
        }
        if (AUTH_INVALID_ROUTES?.includes(pathName)) {
          isValidRoute = false;
        }
      } else {
        isValidRoute = !UNAUTH_INVALID_ROUTES?.includes(pathName);
      }

      if (!isValidRoute) {
        toast.error(messages.INVALID_ACCESS);
        router.push("/404");
      }
    }
  }, [user, pathName, isLoading]);
  useEffect(() => setVisible(true), []);

  const handleScroll = useCallback(() => {
    const currentScrollY = scrollY.get();

    if (currentScrollY < 10) {
      setVisible(true);
    } else if (currentScrollY < lastScrollY) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    setLastScrollY(currentScrollY);
  }, [scrollY, lastScrollY]);

  useMotionValueEvent(scrollY, "change", handleScroll);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        event.key === "n" &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {
        setVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'About Us',
      link: '/about',
      icon: <IconWorld className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
    ...(user?.userRole === 'patients'
      ? [
        {
          name: 'My Profile',
          link: '/pat/profile',
          icon: (
            <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />
          ),
        },
        {
          name: 'Notes',
          link: '/pat/notes',
          icon: (
            <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />
          ),
        },
        {
          name: 'Doctors List',
          link: '/pat/doctors',
          icon: (
            <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />
          ),
        },
      ]
      : user?.userRole === 'doctors'
        ? [
          {
            name: 'My Profile',
            link: '/doc/profile',
            icon: (
              <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />
            ),
          },
          {
            name: 'Notes',
            link: '/doc/notes',
            icon: (
              <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />
            ),
          },
          {
            name: 'Patients List',
            link: '/doc/patients',
            icon: (
              <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />
            ),
          },
        ]
        : []),
  ];
  const navWidthClass = user?.uid ? 'w-[70%]' : 'w-[40%]';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
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
        transition={{
          duration: 0.2,
        }}
        className={cn(
          `flex fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-2 items-center justify-between
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
                  src="/favicon.svg"
                  // src="/favicon.svg dark:/favicon-dark.svg"
                  alt="Logo"
                  className="w-6 h-6 border-2 rounded-full"
                /></span>
              <span className='hidden sm:block text-sm'><Logo /></span>
            </>
          </div>
        </div>

        {/* Middle - Navigation Links */}
        <div className="flex items-center justify-center space-x-4">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative font-bold text-lg dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>

        {/* Right Side - Auth Button and Mode Toggle */}
        <div className="flex items-center space-x-2">
          <AuthNavBarButton />
          <ModeToggle />
        </div>
      </motion.div>
    </AnimatePresence >
  );
};
