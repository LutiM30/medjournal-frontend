import {
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signOut as _signOut,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { userAtom } from "../atoms/userAtom";
import { isLoadingAtom } from "../atoms/atoms";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import getProfileData from "../functions/Firestore/getProfileData";
import dayjs from "dayjs";
import { toast } from "sonner";
import { api } from "../apis/api";
import { CREATE_USER_ROLE } from "../apis/apiUrls";

export const formatAuthUser = async (user) => {
  const tokenResult = await user.getIdTokenResult(true);

  const authUserObj = {
    uid: user.uid || "",
    token: user.accessToken || "",
    displayName: user.displayName || "",
    role: "",
    isAdmin: "",
    createdAt: dayjs(user?.metadata?.creationTime).toDate() || "",
    token: user?.accessToken || "",
  };

  if (authUserObj.uid) {
    authUserObj.role = tokenResult?.claims?.role || null;
    authUserObj.isAdmin = tokenResult?.claims?.admin || false;

    if (!authUserObj.isAdmin) {
      const profileDoc = await getProfileData(
        authUserObj.uid,
        authUserObj.role
      );

      const profileData = profileDoc?.data();
      const createdAt = profileData?.createdAt?.toDate();

      const profile = { ...profileData, createdAt };

      authUserObj.profile = formatProfile(profile);
    }
  }

  return authUserObj;
};

const formatProfile = (profile) => ({
  createdAt: profile.createdAt,
  patients_id: profile.patients_id || "",
  doctors_id: profile.doctors_id || "",
  isProfileComplete: profile.isProfileComplete,
});

export default function useFirebaseAuth() {
  const setAuthUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(isLoadingAtom);
  const router = useRouter();
  const authStateChanged = async (authState) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    await auth.currentUser.getIdTokenResult(true);
    const formattedUser = await formatAuthUser(authState);

    setAuthUser({ ...formattedUser });

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signIn = ({ email, password }) =>
    _signInWithEmailAndPassword(auth, email, password);

  const signUp = async ({ firstName, lastName, role, email, password }) => {
    try {
      const response = await api(CREATE_USER_ROLE, {
        firstName,
        lastName,
        role,
        email,
        password,
      });
      if (response.data.token) {
        return await signInWithCustomToken(auth, response.data.token);
      } else {
        throw new Error("Oops, Something went wrong try again later");
      }
    } catch (error) {
      console.error();
      toast.error("Oops, Something went wrong try again later");
    }
  };
  const sendPasswordResetEmail = async ({ email }) => {
    try {
      return await _sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("useFirebaseAuth error on line 52: ", error);
      throw error;
    }
  };

  const signOut = async () => {
    await _signOut(auth);
    router.push("/");
    clear();
  };

  const onAuthStateChanged = (currentUser) =>
    _onAuthStateChanged(auth, currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
  };
}
