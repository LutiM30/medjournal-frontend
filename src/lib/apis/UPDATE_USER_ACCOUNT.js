/**
 * Configuration for the `update-user-account` API endpoint.
 * @constant
 * @type {Object}
 * @property {string} url - The URL endpoint for updating user accounts.
 * @property {string} method - HTTP method for the request, in this case, 'post'.
 * @property {boolean} isMultipart - Specifies if the request is multipart; in this case, it is `false`.
 * @property {boolean} showToast - Specifies if a toast notification should be shown on the frontend; in this case, it is `true`.
 * @property {boolean} tokenRequired - Specifies if a token is required for authentication; in this case, it is `true`.
 */
export default {
  url: 'update-user-account',
  method: 'post',
  isMultipart: false,
  showToast: true,
  tokenRequired: true,
};
