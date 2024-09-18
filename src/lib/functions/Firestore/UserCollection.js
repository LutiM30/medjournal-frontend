import { db } from '@/lib/firebase';

import { doc } from '@firebase/firestore';
import { setDoc } from '@firebase/firestore';
import { collections } from './collections';

import { messages, USER_ROLES_OPTIONS } from '@/lib/utils';

export const AddUser = async (data) => {
  if (data.userRole in USER_ROLES_OPTIONS?.map((role) => role?.value)) {
    throw messages.InvalidUserRole;
  } else {
    const toUserCollection = {
      uid: data?.uid,
      userRole: data?.userRole,
      createdAt: data?.createdAt,
    };

    try {
      await setDoc(doc(db, collections.USERS, data.uid), toUserCollection);
      await setDoc(doc(db, data.userRole, data.uid), data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
