import {
  IconUser,
  IconUsersGroup,
  IconClipboardHeart,
} from '@tabler/icons-react';

export const FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT =
  'group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-slate-800 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]';
export const FULL_WIDTH_BTN_HV_EFCT_CLASS =
  'bg-gradient-to-br relative group/btn from-black dark:from-slate-900 dark:to-slate-900 to-neutral-600 block dark:bg-slate-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--slate-800)_inset,0px_-1px_0px_0px_var(--slate-800)_inset] mt-4';

export const PATIENT_ROLE = 'patients';
export const DOCTOR_ROLE = 'doctors';
export const ADMIN_ROLE = 'admin@medjournal';

export const AUTH_PUBLIC_ROUTES = ['/about', 'password-reset', '/404'];

export const AUTH_INVALID_ROUTES = ['signin', 'signup'];

export const DOCTOR_ROUTES = ['/doc/profile', '/doc/notes', '/doc/patients'];
export const PATIENT_ROUTES = ['/pat/profile', '/pat/notes', '/pat/doctors'];
export const ADMIN_ROUTES = ['/admin/users', '/admin/roles', '/admin/settings','/admin/appointments'];

export const UNAUTH_INVALID_ROUTES = [
  ...DOCTOR_ROUTES,
  ...PATIENT_ROUTES,
  ...ADMIN_ROUTES,
];

export const INVALID_CREDS = 'auth/invalid-credential';
export const SIGNUP_TXT = 'Sign Up';
export const SIGNIN_TXT = 'Sign In';
export const SIGNUP_LINK = 'Want to create new account ?';
export const SIGNIN_LINK = 'Already have an account ?';
export const FORGOT_PASSWORD =
  'Forgot your password? request the reset link now!';

export const USER_ROLES_ROUTES = {
  [PATIENT_ROLE]: [
    {
      name: 'My Profile',
      link: '/pat/profile',
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
    {
      name: 'Notes',
      link: '/pat/notes',
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
    {
      name: 'Doctors List',
      link: '/pat/doctors',
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
  ],
  [DOCTOR_ROLE]: [
    {
      name: 'My Profile',
      link: '/doc/profile',
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
    {
      name: 'Notes',
      link: '/doc/notes',
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
    {
      name: 'Patients List',
      link: '/doc/patients',
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
  ],
  [ADMIN_ROLE]: [
    {
      name: 'Users',
      link: '/admin/users',
      icon: (
        <IconUsersGroup className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
    {
      name: 'Appointments',
      link: '/admin/appointments',
      icon: (
        <IconClipboardHeart className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
  ],
};

export const DEFAULT_LOADING_STATES = [
  {
    text: 'Loading',
  },
  {
    text: 'Still Loading',
  },
  {
    text: 'Loading More...',
  },
];
