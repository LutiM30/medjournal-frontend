import { atom } from 'jotai';

export const userAtom = atom({
  uid: '',
  token: '',
  displayName: '',
  role: '',
  isAdmin: false,
  createdAt: '',
  profile: {
    createdAt: '',
    patients_id: '',
    isProfileComplete: false,
  },
});
