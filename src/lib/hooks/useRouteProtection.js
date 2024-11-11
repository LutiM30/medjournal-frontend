'use client';
import { useEffect } from 'react';
import { messages } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';

import {
  ADMIN_ROUTES,
  AUTH_INVALID_ROUTES,
  AUTH_PUBLIC_ROUTES,
  DOCTOR_ROLE,
  DOCTOR_ROUTES,
  PATIENT_ROLE,
  PATIENT_ROUTES,
  UNAUTH_INVALID_ROUTES,
} from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { isLoadingAtom } from '@/lib/atoms/atoms';

/**
 * Custom hook for route protection
 * @param {string} pathName - Current path
 * @returns {boolean} Whether the current route is valid
 */
const useRouteProtection = ({ pathName }) => {
  const router = useRouter();
  const isLoading = useAtomValue(isLoadingAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (isLoading) return;

    if (pathName === '/') return;

    const validateRoute = () => {
      let isValidRoute = false;

      // First check if user is authenticated
      if (user?.uid) {
        // Check if it's a public route for authenticated users
        if (AUTH_PUBLIC_ROUTES?.includes(pathName)) {
          return true;
        }

        // Check if it's an invalid route for authenticated users
        if (AUTH_INVALID_ROUTES?.includes(pathName)) {
          return false;
        }

        // Check role-based routes
        if (user.isAdmin && ADMIN_ROUTES?.includes(pathName)) {
          return true;
        }

        switch (user.role) {
          case DOCTOR_ROLE:
            isValidRoute = DOCTOR_ROUTES?.includes(pathName);
            break;
          case PATIENT_ROLE:
            isValidRoute = PATIENT_ROUTES?.includes(pathName);
            break;
          // Remove admin case here since we handled it above
        }

        return isValidRoute;
      }

      // For unauthenticated users
      return !UNAUTH_INVALID_ROUTES?.includes(pathName);
    };

    const isValidRoute = validateRoute();

    if (!isValidRoute) {
      toast.error(messages.INVALID_ACCESS);
      router.push('/404');
    }
  }, [user, pathName, isLoading, router]);
};

export default useRouteProtection;
