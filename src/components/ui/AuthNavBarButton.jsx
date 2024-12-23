import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';

import { usePathname, useRouter } from 'next/navigation';
import { isLoadingAtom } from '@/lib/atoms/atoms';
import {
  isUser,
  LOGIN_BTN_TEXT_COLOR,
  LOGOUT_BTN_TEXT_COLOR,
} from '@/lib/utils';
import useFirebaseAuth from '@/lib/hooks/useFirebaseAuth';
import { AUTH_INVALID_ROUTES } from '@/lib/constants';
import { IconUserPlus, IconUserShare } from '@tabler/icons-react';
import { toast } from 'sonner';

const AuthNavBarButton = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { signOut } = useFirebaseAuth();

  const user = useAtomValue(userAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  // [0] means Text, [1] means color
  const [authbuttontext, setAuthButtonText] = useState(LOGIN_BTN_TEXT_COLOR);

  useEffect(() => {
    if (!isLoading) {
      if (!isUser(user)) {
        setAuthButtonText(LOGIN_BTN_TEXT_COLOR);
      } else {
        setAuthButtonText(LOGOUT_BTN_TEXT_COLOR);
        const found = AUTH_INVALID_ROUTES?.find((route) =>
          route?.includes(pathName)
        );

        if (found) router.push('/');
      }
    }
  }, [user, isLoading, pathName]);

  const handleAuthButton = async (path = '') => {
    if (isUser(user) && !path) {
      await signOut();
      setAuthButtonText(LOGIN_BTN_TEXT_COLOR);
      toast.success('You have been logged out');
      router.push('/signin');
    } else {
      router.push(path || '/');
    }
  };

  if (isUser(user)) {
    return (
      <AuthButton
        authbuttontext={authbuttontext}
        onClick={() => handleAuthButton()}
      />
    );
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full'>
            <span>{authbuttontext[0]}</span>
            <span
              className={`absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent  ${authbuttontext[1]} to-transparent  h-px`}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-55 mt-4'>
          <DropdownMenuItem key={2} onClick={() => handleAuthButton('/signin')}>
            Sign In
            <DropdownMenuShortcut><IconUserShare className='h-4 w-4 text-neutral-500 dark:text-white' /></DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem key={1} onClick={() => handleAuthButton('/signup')}>
            Sign Up
            <DropdownMenuShortcut><IconUserPlus className='h-4 w-4 text-neutral-500 dark:text-white' /></DropdownMenuShortcut>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default AuthNavBarButton;

const AuthButton = (props) => {
  const { authbuttontext } = props;
  return (
    <button
      className='border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full'
      {...props}
    >
      <span>{authbuttontext[0]}</span>
      <span
        className={`absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent  ${authbuttontext[1]} to-transparent  h-px`}
      />
    </button>
  );
};
