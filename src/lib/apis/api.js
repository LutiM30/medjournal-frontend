import axios from 'axios';
import queryString from 'query-string';
import store from '@/lib/atoms/atomsStore';
import { userAtom } from '@/lib/atoms/userAtom';
import { signOut } from 'firebase/auth';
import { AUTH_INVALID_ROUTES } from '../constants';
import { toast } from 'sonner';
import { isEmpty } from 'radash';
import { FILE_MAX_LIMIT, MAX_FIVE_MB_SERVER } from '../utils';

const USER_API = process.env.NEXT_PUBLIC_API_URL + 'api/users/';

/**
 * Extracts a display message from the error object or message string
 * @param {Object|string} error - The error object or string
 * @param {string} message - The fallback message
 * @returns {string} The display message
 */
const getDisplayMessage = (error, message) => {
  if (error && typeof error === 'object' && !isEmpty(error)) {
    return typeof error[Object.keys(error)[0]] === 'string'
      ? error[Object.keys(error)[0]]
      : error[Object.keys(error)[0]][0];
  }
  if (error && typeof error === 'string') return error;
  if (message) return message;

  console.error('ERROR from LINE 29: ', error);

  return 'Something went wrong';
};

/**
 * Handles the error response from the API
 * @param {Object} res - The error response object
 * @param {boolean} ignoreError - Whether to ignore displaying the error
 * @returns {Object} An object containing error details
 */
const handleErrorResponse = (res, ignoreError) => {
  const { message, status, error } = res?.data;

  if (status === 401 || status === 403) {
    signOut();
    window.location.replace(
      `${process.env.NEXT_PUBLIC_URL}/${AUTH_INVALID_ROUTES[0]}`
    );
  }

  let displayMsg = getDisplayMessage(error, message);

  if (!ignoreError) {
    toast.error(
      displayMsg === MAX_FIVE_MB_SERVER ? FILE_MAX_LIMIT(5) : displayMsg
    );
  }

  return {
    data: {
      error: true,
      status,
      message:
        displayMsg === MAX_FIVE_MB_SERVER ? FILE_MAX_LIMIT(5) : displayMsg,
    },
  };
};

/**
 * Makes an API request
 * @param {Object} endpoint - The endpoint configuration object from ApiUrls
 * @param {Object} data - The data to send with the request (used in POST, PUT methods)
 * @param {string} [id=null] - The ID to append to the URL (usually used in PUT methods)
 * @param {Object} [params=null] - Query parameters to append to the URL
 * @returns {Promise<Object>} The API response
 */
export const api = async (endpoint, data, id = null, params = null) => {
  const user = store.get(userAtom);
  const token = user?.token;

  const { method, isMultipart, url, showToast, ignoreError, responseType } =
    endpoint;

  const headers = {
    'Content-Type': isMultipart
      ? `multipart/form-data boundary=${data?._boundary}`
      : 'application/json',
  };

  const authToken = params?.authToken || null;
  delete params.authToken;

  if (token || authToken) {
    headers.authorization = `Bearer ${token || authToken}`;
  } else {
    toast.warning('No Auth Token');
  }

  const requestUrl = `http://${USER_API}${url}${id || ''}${
    params ? `?${queryString.stringify(params)}` : ''
  }`;

  const requestConfig = {
    method,
    url: requestUrl,
    headers,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined,
    responseType: responseType || undefined,
  };

  try {
    const response = await axios(requestConfig);

    if (response.data?.status === 200 && showToast) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error) {
    console.error('113 --- ', error);

    return handleErrorResponse(error.response, ignoreError);
  }
};
