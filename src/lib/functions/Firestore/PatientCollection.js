import { db } from '@/lib/firebase';
import { PATIENT_ROLE } from '@/lib/constants';
import removeEmailFromData from '../removeEmailFromData';
import { collections } from './collections';
import { messages } from '@/lib/utils';
import { setDoc, doc } from '@firebase/firestore';

export const AddPatient = async (data) => {
  if (data.userRole !== PATIENT_ROLE) {
    throw messages.InvalidUserRole;
  } else {
    const toCollection = removeEmailFromData(data);

    delete toCollection.userRole;

    try {
      return await setDoc(
        doc(db, collections.PATIENTS, toCollection.uid),
        toCollection
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
