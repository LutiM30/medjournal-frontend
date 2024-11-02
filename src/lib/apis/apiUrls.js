export const CREATE_USER_ROLE = {
  url: 'create-user',
  method: 'post',
  isMultipart: false,
  showToast: true,
};
/**
 * This API takes ids in query params in array format
 * eg [
      "someid1",
      "someid2",
      "someid3",
    ]
 */
export const GET_USERS = {
  url: 'get-users',
  method: 'get',
  isMultipart: false,
  showToast: false,
};

export const GET_ALL_USERS = {
  url: 'get-all-users',
  method: 'get',
  isMultipart: false,
  showToast: false,
  tokenRequired: true,
};
