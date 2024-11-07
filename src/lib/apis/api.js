import axios from 'axios';
import queryString from 'query-string';
import { signOut } from 'firebase/auth';
import { AUTH_INVALID_ROUTES } from '../constants';
import { toast } from 'sonner';
import { isEmpty } from 'radash';
import { FILE_MAX_LIMIT, MAX_FIVE_MB_SERVER } from '../utils';
import { tokenManager } from '../functions/TokenManager';

const BASE_URL = '/api/users';

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

const handleErrorResponse = (res, ignoreError) => {
  if (!res) {
    console.error('Network or server error:', res);
    toast.error('Network or server error!');
    return;
  }

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

export const api = async (endpoint, data, id = null, params = null) => {
  const { ignoreError } = endpoint;
  try {
    const { method, isMultipart, url, showToast, responseType, tokenRequired } =
      endpoint;

    let headers = {
      'Content-Type': isMultipart
        ? `multipart/form-data boundary=${data?._boundary}`
        : 'application/json',
    };

    if (tokenRequired) {
      const token = await tokenManager.getValidToken();
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }
    }

    const requestUrl = `${BASE_URL}/${url}${id ? `/${id}` : ''}${
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

    const response = await axios(requestConfig);

    if (response.data?.status === 200 && showToast) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    return handleErrorResponse(error.response, ignoreError);
  }
};
