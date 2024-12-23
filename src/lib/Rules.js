import {
  INPUT_FIELD_MAX_LENGTH,
  INPUT_PASSWORD_MAX_LENGTH,
  INPUT_PASSWORD_MIN_LENGTH,
  messages,
  USER_ROLES_OPTIONS,
  VALID_EMAIL_REGEX,
  VALID_PASSWORD_REGEX,
  VALID_TEXT_REGEX,
} from './utils';

export const EmailRules = {
  required: messages.email,
  pattern: {
    value: VALID_EMAIL_REGEX,
    message: messages.invalidEmail,
  },
};

export const PasswordRules = {
  required: messages.password,
  pattern: {
    value: VALID_PASSWORD_REGEX,
    message: messages.invalidPassword,
  },

  minLength: {
    value: INPUT_PASSWORD_MIN_LENGTH,
    message: messages.passwordNameMinLength,
  },
  maxLength: {
    value: INPUT_PASSWORD_MAX_LENGTH,
    message: messages.passwordNameMinLength,
  },
};

export const ConfirmPasswordRules = (watch) => ({
  required: messages.confirmPassword,
  validate: (val) => {
    if (watch('password') != val) {
      return 'Your passwords do no match';
    }
  },
});

export const FirstNameRules = {
  required: messages.firstName,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: messages.firstNameMaxLength,
  },
};

export const LastNameRules = {
  required: messages.lastName,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: messages.lastNameMaxLength,
  },
};

export const userRoleRules = {
  required: messages.lastName,
  validate: (val) => {
    if (!USER_ROLES_OPTIONS?.map((role) => role?.value)?.includes(val)) {
      return 'Invalid selection of Role';
    }
  },
};

export const AddressRules = {
  required: "Address is required",
  maxLength: {
    value: 100,
    message: "Address should not exceed 100 characters",
  },
};

export const PhoneNumberRules = {
  required: "Phone number is required",
  pattern: {
    value: /^[0-9]{10}$/,
    message: "Phone number must be exactly 10 digits",
  },
};

export const SpecialtyRules = {
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: "Specialty should not exceed 50 characters",
  },
  pattern: {
    value: VALID_TEXT_REGEX,
    message: "Specialty should contain only alphabetic characters",
  },
};

export const CityRules = {
  pattern: {
    value: VALID_TEXT_REGEX,
    message: "City should contain only alphabetic characters",
  },
};
export const ProvinceRules = {
  pattern: {
    value: VALID_TEXT_REGEX,
    message: "Province should contain only alphabetic characters",
  },
};
