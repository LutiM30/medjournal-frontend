/**
 * The `useFirebaseAuth` hook handles Firebase authentication operations,
 * including user sign-in, sign-up, password reset, sign-out, and managing
 * authentication state changes.
 *
 * @returns {{
 *   signIn: ({ email: string, password: string }) => Promise<import('firebase/auth').UserCredential>,
 *   signUp: ({ firstName: string, lastName: string, role: string, email: string, password: string }) => Promise<import('firebase/auth').UserCredential>,
 *   signOut: () => Promise<void>,
 *   sendPasswordReset: ({ email: string }) => Promise<void>
 * }}
 */
import {
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signInWithCustomToken,
  signOut as _signOut,
  sendPasswordResetEmail as _sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { userAtom } from '../atoms/userAtom';
import { isLoadingAtom } from '../atoms/atoms';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import getProfileData from '../functions/Firestore/getProfileData';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { api } from '../apis/api';
import { CREATE_USER_ROLE } from '../apis/apiUrls';

export const userLoggedIn = auth.currentUser ?? false;

/**
 * @typedef {Object} AuthUser
 * @property {string} uid - User's unique identifier.
 * @property {string} accessToken - User's access token.
 * @property {string} displayName - User's display name.
 * @property {string|null} role - User's role in the system.
 * @property {boolean} isAdmin - Whether the user has admin privileges.
 * @property {boolean} verified - Whether the user is verified (e.g., for doctors).
 * @property {URL} photoURL - User's profile picture URL.
 * @property {Date} createdAt - Account creation date.
 * @property {Object} [profile] - Profile information (if not admin), containing additional details.
 */

/**
 * Formats a Firebase user object into a standardized `AuthUser` object.
 *
 * @param {import('firebase/auth').User} user - Firebase user object.
 * @returns {Promise<AuthUser|null>} A formatted `AuthUser` object or `null` if the user is invalid.
 * @throws {Error} If there is an error during formatting.
 */

export const formatAuthUser = async (user) => {
  if (!user) return null;

  try {
    const tokenResult = await user.getIdTokenResult(true);

    const authUserObj = {
      uid: user.uid || '',
      accessToken: user.accessToken || '',
      displayName: user.displayName || '',
      role: tokenResult?.claims?.role || null,
      isAdmin: tokenResult?.claims?.admin || false,
      verified: tokenResult?.claims?.verified,
      photoURL: tokenResult.claims.picture,
      createdAt: user?.metadata?.creationTime
        ? dayjs(user.metadata.creationTime).toDate()
        : null,
    };

    if (authUserObj.uid && !authUserObj.isAdmin) {
      try {
        const profileDoc = await getProfileData(
          authUserObj.uid,
          authUserObj.role
        );

        if (profileDoc?.data()) {
          const profileData = profileDoc.data();
          const createdAt = profileData?.createdAt?.toDate();
          authUserObj.profile = formatProfile({ ...profileData, createdAt });
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
      }
    }

    return authUserObj;
  } catch (error) {
    console.error('Error formatting auth user:', error);
    throw error;
  }
};

/**
 * Formats a user profile object with additional fields and checks.
 *
 * @param {Object} profile - Raw profile data.
 * @param {Date} [profile.createdAt] - Creation date of the profile.
 * @param {string} [profile.patients_id] - Associated patient ID.
 * @param {string} [profile.doctors_id] - Associated doctor ID.
 * @param {boolean} [profile.isProfileComplete] - Indicates if the profile is complete.
 * @returns {{
 *   createdAt: Date | null,
 *   patients_id: string,
 *   doctors_id: string,
 *   isProfileComplete: boolean
 * }}
 */
const formatProfile = (profile) => ({
  ...profile,
  createdAt: profile.createdAt || null,
  patients_id: profile.patients_id || '',
  doctors_id: profile.doctors_id || '',
  isProfileComplete: !!profile.isProfileComplete,
});

export default function useFirebaseAuth() {
  const setAuthUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(isLoadingAtom);
  const router = useRouter();

  /**
   * Listens for changes in the Firebase authentication state and updates the application state.
   *
   * @param {import('firebase/auth').User|null} authState - The current authentication state.
   * @returns {Promise<void>}
   */
  const authStateChanged = async (authState) => {
    try {
      setLoading(true); // Set loading at the start

      if (!authState) {
        setAuthUser(null);
        setLoading(false);
        return;
      }

      // Wait for token refresh and user formatting
      await auth.currentUser?.getIdTokenResult(true);
      const formattedUser = await formatAuthUser(authState);

      if (formattedUser) {
        setAuthUser(formattedUser);
      } else {
        // If no formatted user is returned, clear the auth state
        setAuthUser(null);
      }
    } catch (error) {
      console.error('Auth state change error:', error);
      setAuthUser(null);
    } finally {
      // Only set loading to false after all operations are complete
      setLoading(false);
    }
  };

  /**
   * Signs in a user with email and password.
   *
   * @param {{ email: string, password: string }} credentials - The user's login credentials.
   * @returns {Promise<import('firebase/auth').UserCredential>} Firebase user credential.
   * @throws {Error} If sign-in fails.
   */
  const signIn = async ({ email, password }) => {
    try {
      setLoading(true); // Set loading state before sign in attempt
      const result = await _signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  /**
   * Signs up a new user with additional role and profile details.
   *
   * @param {{ firstName: string, lastName: string, role: string, email: string, password: string }} newUser - The user's registration details.
   * @returns {Promise<import('firebase/auth').UserCredential>} Firebase user credential.
   * @throws {Error} If sign-up fails.
   */
  const signUp = async ({ firstName, lastName, role, email, password }) => {
    try {
      setLoading(true); // Set loading state before sign up attempt
      const response = await api(CREATE_USER_ROLE, {
        firstName,
        lastName,
        role,
        email,
        password,
      });

      if (!response?.token) {
        throw new Error('No token received from server');
      }

      return await signInWithCustomToken(auth, response.token);
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  /**
   * Sends a password reset email to the provided email address.
   *
   * @param {{ email: string }} data - The email address of the user.
   * @returns {Promise<void>} A promise that resolves when the email is sent successfully.
   * @throws {Error} If the password reset fails.
   */
  const sendPasswordReset = async ({ email }) => {
    try {
      await _sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Failed to send password reset email');
      throw error;
    }
  };

  /**
   * Signs out the currently authenticated user and clears the application state.
   *
   * @returns {Promise<void>} A promise that resolves when the user is successfully signed out.
   * @throws {Error} If sign-out fails.
   */
  const signOut = async () => {
    try {
      setLoading(true); // Set loading state before sign out attempt
      await _signOut(auth);
      setAuthUser(null);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error(error.message || 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = _onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    signIn,
    signUp,
    signOut,
    sendPasswordReset,
  };
}
