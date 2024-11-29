import GET_ALL_USERS from '@/lib/apis/GET_ALL_USERS';
import { api } from '@/lib/apis/api';
/**
 * This function asynchronously fetches user data based on a specified page and search criteria using
 * an API call.
 * @returns The `getUsersData` function returns an object with the following properties:
 * - `users`: An array of users data fetched from the API response, defaulting to an empty array if not
 * present.
 * - `pageTokens`: An array of page tokens fetched from the API response, defaulting to an empty array
 * if not present.
 * - `hasNextPage`: A boolean indicating whether there is a next
 */
const getUsersData = async (page, search) => {
  try {
    const response = await api(GET_ALL_USERS, {
      search,
      page,
    });

    if (response.data.error && response.data.message === 'Invalid Page') {
      getUsersData(page - 1, search);
    }

    return {
      users: response?.data?.users || [],
      pageTokens: response?.data?.pageTokens || [],
      hasNextPage: response?.data?.hasNextPage || false,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
};
export default getUsersData;
