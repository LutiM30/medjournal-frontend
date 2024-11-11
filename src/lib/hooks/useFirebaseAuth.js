/**
 * The `useFirebaseAuth` function handles user authentication operations using Firebase, including
 * sign-in, sign-up, password reset, and sign-out functionalities.
 * @param profile - The `profile` parameter in the `formatProfile` function is an object that
 * represents the profile information of a user. It has the following properties:
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
 * @property {string} uid - User's unique identifier
 * @property {string} accessToken - User's access token
 * @property {string} displayName - User's display name
 * @property {string|null} role - User's role in the system
 * @property {boolean} isAdmin - Whether the user has admin privileges
 * @property {boolean} verified - Whether the user has been verified by admin mostly needed for the doctor
 * @property {URL} photoURL - User's profile picture
 * @property {Date} createdAt - Account creation date
 * @property {Object} [profile] - User's profile information (if not admin) it will contain details from patient's collection or doctor's collection no need to call collection separately
 */

/**
 * Formats the Firebase user object into a standardized auth user object
 * @param {import('firebase/auth').User} user - The Firebase user object
 * @returns {Promise<AuthUser|null>} Formatted auth user object or null if no user
 * @throws {Error} If there's an error formatting the user
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
   * Handles changes in authentication state
   * @param {import('firebase/auth').User} authState - Current auth state
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
   * Signs in a user with email and password
   * @param {{ email: string, password: string }} credentials - User credentials
   * @returns {Promise<import('firebase/auth').UserCredential>} Firebase user credential
   * @throws {Error} If sign in fails
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
