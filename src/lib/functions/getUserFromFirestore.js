import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getUserFromFirestore = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};
