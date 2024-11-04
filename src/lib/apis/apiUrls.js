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

/**
 * @constant {Object} GET_ALL_USERS - API configuration for retrieving users
 * @property {string} url - The endpoint URL 'get-all-users'
 * @property {string} method - HTTP method 'post'
 * @property {boolean} isMultipart - Whether the request uses multipart/form-data
 * @property {boolean} showToast - Whether to show toast notifications
 * @property {boolean} tokenRequired - Whether authentication token is required
 */
export const GET_ALL_USERS = {
  url: 'get-all-users',
  method: 'post',
  isMultipart: false,
  showToast: false,
  tokenRequired: true,
};

/**
 * API Documentation for Get All Users Endpoint
 *
 * @endpoint POST /get-all-users
 * @authentication Required - Bearer Token
 * @access Admin only
 *
 * @description
 * Retrieves a paginated list of users with optional search functionality.
 * When search is provided, it performs a fuzzy search across all user fields
 * and returns paginated results. Without search, it returns a regular paginated
 * list of users.
 *
 * @requestBody
 * {
 *   "page": number,     // Page number (starts from 0)
 *   "search"?: string[] // Optional array of search terms
 * }
 *
 * @returns {Object} Response object
 * @property {string} status - Success status ('success' or 'error')
 * @property {Object} data - Response data object
 * @property {Array} data.users - Array of user objects
 * @property {number} data.totalCount - Total number of results
 * @property {number} data.currentPage - Current page number
 * @property {Array<boolean>} data.pageTokens - Array indicating valid pages (regular listing only)
 * @property {boolean} data.hasNextPage - Whether there are more pages available
 *
 * @example
 * // Regular listing request
 * {
 *   "page": 0
 * }
 *
 * // Search request
 * {
 *   "page": 0,
 *   "search": ["john", "doctor"]
 * }
 *
 * @example Response (Success)
 * {
 *   "status": "success",
 *   "data": {
 *     "users": [{
 *       "uid": "user123",
 *       "email": "john@example.com",
 *       "displayName": "John Doe",
 *       "disabled": false,
 *       "role": "doctor",
 *       "isAdmin": false,
 *       "createdAt": "2024-01-01T00:00:00Z",
 *       "lastSignIn": "2024-01-02T00:00:00Z",
 *       "emailVerified": true,
 *       "profile": {
 *         // Additional profile data
 *       }
 *     }],
 *     "totalCount": 100,
 *     "currentPage": 0,
 *     "pageTokens": [true, true, false],
 *     "hasNextPage": true
 *   }
 * }
 *
 * @example Response (Error)
 * {
 *   "status": "error",
 *   "error": "Forbidden",
 *   "message": "Insufficient permissions to access user data"
 * }
 *
 * @errorResponses
 * - 400 Invalid Page: The requested page is not available
 * - 403 Forbidden: User doesn't have admin access
 * - 500 Internal Server Error: Failed to retrieve user list
 *
 * @notes
 * 1. Search functionality:
 *    - When search is provided, the API fetches all users and performs a fuzzy search
 *    - Search results are cached for 5 minutes to improve performance
 *    - Search is performed across all user fields (except sensitive data)
 *
 * 2. Pagination:
 *    - Page size is 10 for regular listing
 *    - Search results use client-side pagination
 *    - Page tokens are maintained for regular listing navigation
 *
 * 3. Performance considerations:
 *    - Search operations may take longer for large user bases
 *    - Cache improves subsequent search performance
 *    - Regular listing uses Firebase's native pagination
 *
 * 4. Security:
 *    - Requires valid authentication token
 *    - Only accessible to users with admin role
 *    - Sensitive fields are excluded from search
 */
