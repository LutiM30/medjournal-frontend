export const CREATE_USER_ROLE = {
  url: 'create-user',
  method: 'post',
  isMultipart: false,
  showToast: true,
};

export const GET_USERS = {
  url: 'get-users',
  method: 'get',
  isMultipart: false,
  showToast: false,
};

export const UPDATE_PHOTO_URL = {
  url: '/update-photo-url',
  method: 'post',
  isMultipart: false,
  showToast: false,
  tokenRequired: true,
};
