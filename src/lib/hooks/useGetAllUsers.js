import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';
import { isLoadingAtom } from '@/lib/atoms/atoms';
import getUsersData from '@/lib/functions/getUsersData';

/**
 * Custom hook `useGetAllUsers` manages the state and logic for fetching and paginating a list of users.
 * It handles search functionality, pagination, and provides methods for triggering data updates.
 *
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {Date} createdAt - The date when the user was created.
 * @property {boolean} isActive - Indicates whether the user is active.
 *
 * @typedef {Object} GetUsersResult
 * @property {User[]} users - Array of user objects
 * @property {string[]} pageTokens - Tokens for pagination
 * @property {boolean} hasNextPage - Indicates if there are more pages
 
 * @returns {{
 *   users: User[],                // Array of user objects.
 *   setSearch: (searchTerm: string) => void, // Function to set the search term for filtering users.
 *   search: string,               // Current search term used for filtering the users.
 *   setCurrentPage: (page: number) => void, // Function to update the current page for pagination.
 *   currentPage: number,          // The current page number in the pagination state.
 *   trigger: () => void,          // Function to manually trigger a data fetch for refreshing the user list.
 *   hasNextPage: boolean,         // Boolean indicating whether there are more pages available to fetch.
 *   pageTokens: string[]          // Array of tokens used for managing pagination across pages.
 * }}
 *
 * @description
 * - This hook is designed to fetch user data with support for paginated results.
 * - Provides search functionality to filter user data based on a search term.
 * - Includes methods to update the current page and trigger a manual refresh.
 * - Tracks whether there are additional pages to fetch and manages pagination tokens.
 *
 * @example
 * const {
 *   users,
 *   setSearch,
 *   search,
 *   setCurrentPage,
 *   currentPage,
 *   trigger,
 *   hasNextPage,
 *   pageTokens,
 * } = useGetAllUsers();
 *
 * // Setting a search term
 * setSearch('John Doe');
 *
 * // Navigating to the next page
 * setCurrentPage(currentPage + 1);
 *
 * // Manually refreshing the user list
 * trigger();
 */
const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageTokens, setPageTokens] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const user = useAtomValue(userAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const fetchUsers = async () => {
    if (!user?.accessToken || isLoading) return;

    setIsLoading(true);
    try {
      const result = await getUsersData(currentPage, search);
      if (result) {
        setUsers(result.users || []);
        setPageTokens(result.pageTokens || []);
        setHasNextPage(result.hasNextPage || false);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user, currentPage, search, switcher]);

  const trigger = () => setSwitcher((prev) => !prev);

  return {
    users,
    setSearch,
    search,
    setCurrentPage,
    currentPage,
    trigger,
    hasNextPage,
    pageTokens,
  };
};

export default useGetAllUsers;
