import { api } from '../apis/api';
import UPDATE_USER_ACCOUNT from '../apis/UPDATE_USER_ACCOUNT.js';

export const USER_ACTIONS = {
  delete: 'delete',
  disable: 'disable',
  verify: 'verify',
  enable: 'enable',
};

/**
 * Updates the status of one or more user accounts.
 * @async
 * @param {(string|string[])} [ids = []] - The ID(s) of the user account(s) to update. If not provided, an empty array is used.
 * @param {keyof typeof USER_ACTIONS} action - The action to perform on the user account(s). Must be one of the keys in the USER_ACTIONS object.
 * @returns {Promise<Object>} - The response from the server.
 * @throws {Error} - If the request fails or if the `action` parameter is not a valid key in the USER_ACTIONS object.
 */
export default async (ids = [], action) => {
  const idsArray = Array.isArray(ids) ? ids : [ids];

  if (!Object.keys(USER_ACTIONS).includes(action)) {
    throw new Error(`Invalid action: ${action}`);
  }

  return await api(UPDATE_USER_ACCOUNT, {
    ids: idsArray,
    action: USER_ACTIONS[action],
  });
};
