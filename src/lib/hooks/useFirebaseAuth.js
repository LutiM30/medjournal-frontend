import {
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signOut as _signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { userAtom } from '../atoms/userAtom';
import { loadingAtom } from '../atoms/atoms';
import { useSetAtom } from 'jotai';

const formatAuthUser = (user) => ({
  uid: user?.uid || '',
  email: user?.email || '',
});

export default function useFirebaseAuth() {
  const setAuthUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(loadingAtom);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signIn = ({ email, password }) =>
    _signInWithEmailAndPassword(auth, email, password);

  const signUp = ({ email, password }) =>
    _createUserWithEmailAndPassword(auth, email, password);

  const signOut = async () => {
    await _signOut(auth);
    clear();
  };

  const onAuthStateChanged = (cb) => _onAuthStateChanged(auth, cb);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    signIn,
    signUp,
    signOut,
  };
}
