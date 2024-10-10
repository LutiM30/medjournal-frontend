import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PATIENT_ROLE, DOCTOR_ROLE } from './constants';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const projectConstants = {
  PROJECT_NAME: 'MedJournal',
  TEAM_NAME: 'Group 3',
  TEAM_MEMBERS: ['Mitul', 'Dhruvin', 'Aartiben', 'Riten'],
  GITHUB_REPO_URL: 'https://github.com/LutiM30/medjournal-frontend',
};
export const MAX_FIVE_MB_SERVER = 'E_EXCEEDS_UPLOAD_LIMIT';

export const CURRENT_YEAR = () => new Date()?.getFullYear();
export const INPUT_PASSWORD_MIN_LENGTH = 8;
export const INPUT_PASSWORD_MAX_LENGTH = 32;

export const INPUT_FIELD_MAX_LENGTH = 50;

export const VALID_TEXT_REGEX = /^[A-Za-z ]+$/i;
export const VALID_ALPHA_NUMERIC_REGEX = /^[A-Za-z0-9]+$/i;
export const VALID_EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i;
export const VALID_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&]{8,}$/;

export const LOGIN_BTN_TEXT_COLOR = ['Sign In', 'via-blue-500'];
export const LOGOUT_BTN_TEXT_COLOR = ['Sign Out', 'via-red-500'];

export const isUser = (user) => user?.uid || user?.email;

export const USER_ROLES_OPTIONS = [
  { key: 1, label: 'Patient', value: PATIENT_ROLE },
  { key: 2, label: 'Doctor', value: DOCTOR_ROLE },
];

export const messages = {
  INVALID_ACCESS: "You don't have permission of this page.",

  email: 'Email is required',
  invalidEmail: 'Please enter correct email address',

  firstName: 'First name is required',
  firstNameMaxLength: `First name should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,

  lastName: 'Last name is required',
  lastNameMaxLength: `Last name should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,

  password: 'Password is required',
  passwordNameMaxLength: `Password should not exceed ${INPUT_PASSWORD_MAX_LENGTH} characters`,
  passwordNameMinLength: `Password must at least be of ${INPUT_PASSWORD_MIN_LENGTH} characters`,
  invalidPassword:
    'Password should contain at least 1 number, 1 uppercase letter, 1 lowercase letter and One special character',

  confirmPassword: 'Confirm password is required',
  confirmNewPassword: 'Confirm new password is required',
  passwordNotMatch: 'Password and confirm password must match',

  role: 'User Role is required',
  InvalidUserRole: 'Invalid selection of Role',
};

export const FILE_MAX_LIMIT = (MB) =>
  `Max file upload limit exceeded (${MB}MB)`;
export const ASTRONAUT_IMAGE =
  'https://i.imgur.com/VurcHkh.png';
