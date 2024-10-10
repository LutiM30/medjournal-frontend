'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { userAtom } from '@/lib/atoms/userAtom';
import { useAtomValue } from 'jotai';
import { auth } from '../firebase';

const withRoleProtection = (WrappedComponent, allowedRole) => {
  return function ProtectedComponent() {
    const user = useAtomValue(userAtom);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (user?.role !== allowedRole) {
        router.push('/');
      }
      if (!auth.currentUser) {
      }
    }, [user, router]);

    return <WrappedComponent />;
  };
};

export default withRoleProtection;
