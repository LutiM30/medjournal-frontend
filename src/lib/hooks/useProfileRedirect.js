import { useRouter } from 'next/navigation';
import {
  ADMIN_ROLE,
  ADMIN_ROUTES,
  DOCTOR_ROLE,
  DOCTOR_ROUTES,
  PATIENT_ROLE,
  PATIENT_ROUTES,
} from '../constants';
import { useAtomValue } from 'jotai';
import { userAtom } from '../atoms/userAtom';

export default () => {
  const router = useRouter();
  const user = useAtomValue(userAtom);

  return () => {
    switch (user?.role) {
      case DOCTOR_ROLE:
        return router.push(DOCTOR_ROUTES[0]); // doc/profile

      case PATIENT_ROLE:
        return router.push(PATIENT_ROUTES[0]); // pat/profile

      case ADMIN_ROLE:
        return router.push(ADMIN_ROUTES[0]); // admin/users

      default:
        return router.push('/');
    }
  };
};
