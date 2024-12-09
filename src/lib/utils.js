import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PATIENT_ROLE, DOCTOR_ROLE, UNIQUE_SYMBOLS } from './constants';
import { IconLogin2, IconLogout } from '@tabler/icons-react';
import { random, shuffle, draw } from 'radash';
import { generate } from 'random-words';

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

export const LOGIN_BTN_TEXT_COLOR = [<IconLogin2 size={18} />, 'via-blue-500'];
export const LOGOUT_BTN_TEXT_COLOR = [<IconLogout size={18} />, 'via-red-500'];

export const isUser = (user) => user?.uid || user?.email;

export const USER_ROLES_OPTIONS = [
  { key: 1, label: 'Patient', value: PATIENT_ROLE },
  { key: 2, label: 'Doctor', value: DOCTOR_ROLE },
];

/**
 * Determines if a route is valid for the current user role
 * @param {string} pathName - Current path
 * @param {string} role - User role
 * @param {boolean} isAdmin - User admin status
 * @param {RouteConfig} routes - Route configuration
 * @returns {boolean} Whether the route is valid
 */
export const isValidRouteForRole = (pathName, role, isAdmin, routes) => {
  switch (role) {
    case DOCTOR_ROLE:
      return routes.DOCTOR_ROUTES?.includes(pathName);
    case PATIENT_ROLE:
      return routes.PATIENT_ROUTES?.includes(pathName);
    case ADMIN_ROLE:
      return isAdmin && routes.ADMIN_ROUTES?.includes(pathName);
    default:
      return false;
  }
};

export const messages = {
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
export const ASTRONAUT_IMAGE = 'https://i.imgur.com/VurcHkh.png';

/**
 * The function getRandomNumberSymbols generates a random string of numbers or symbols based on the
 * specified length.
 * @param length - The `length` parameter specifies the number of random elements you want to generate.
 * @param [symbols=false] - The `symbols` parameter in the `getRandomNumberSymbols` function is a
 * boolean flag that determines whether to include symbols in the generated random number. If `symbols`
 * is set to `true`, the function will draw random symbols from the `UNIQUE_SYMBOLS` array.
 * @returns The function `getRandomNumberSymbols` returns a string of random numbers or symbols based
 * on the specified length and whether symbols are allowed.
 */
export const getRandomNumberSymbols = (length, symbols = false) => {
  const eleArray = [];
  for (let index = 0; index < length; index++) {
    const randomEle = symbols ? draw(UNIQUE_SYMBOLS) : random(0, 9);
    eleArray.push(randomEle);
  }

  const joinedEle = shuffle(eleArray)?.join('');

  return !symbols ? Number(joinedEle) : joinedEle;
};

export const randomlyCapitalize = (word) => {
  return word
    .split('')
    .map((char) =>
      Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
    )
    .join('');
};

/**
 * The getRandomString function generates a random string with a mix of uppercase letters, numbers, and
 * symbols of varying lengths.
 * @returns The `getRandomString` function returns a randomly generated string that consists of a
 * random word, random numbers, and random symbols. The lengths of the word, numbers, and symbols are
 * determined randomly within certain constraints, and the final string is created by shuffling and
 * joining these components together.
 */
export const getRandomString = () => {
  const stringLength = random(8, 16);
  const wordLength = random(1, stringLength);
  const numLength = random(1, stringLength - wordLength);
  const charsLength = random(1, stringLength - numLength - wordLength);

  const randomWord = randomlyCapitalize(generate({ maxLength: wordLength }));

  const randomNumber = getRandomNumberSymbols(numLength);
  const randomSymbol = getRandomNumberSymbols(charsLength, true);

  const shuffledArr = shuffle([randomWord, randomNumber, randomSymbol]);

  return shuffledArr?.join('');
};
