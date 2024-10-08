'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userAtom } from '@/lib/atoms/userAtom';
import { useAtomValue } from 'jotai';

const withRoleProtection = (WrappedComponent, allowedRole) => {
  return function ProtectedComponent() {
    const user = useAtomValue(userAtom);
    const router = useRouter();

    useEffect(() => {
      if (user?.userRole !== allowedRole) {
        router.push('/');
      }
    }, [user, router]);

    return <WrappedComponent />;
  };
};

export default withRoleProtection;
