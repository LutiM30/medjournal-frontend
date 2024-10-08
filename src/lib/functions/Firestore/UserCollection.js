import { db } from '@/lib/firebase';

import { doc } from '@firebase/firestore';
import { setDoc } from '@firebase/firestore';
import { collections } from './collections';

import { messages, USER_ROLES_OPTIONS } from '@/lib/utils';
import { DOCTOR_ROLE, PATIENT_ROLE } from '@/lib/constants';
import { AddDoctor } from './DoctorCollection';
import { AddPatient } from './PatientCollection';

export const AddUser = async (data) => {
  if (
    !USER_ROLES_OPTIONS?.map((role) => role?.value)?.includes(data.userRole)
  ) {
    throw messages.InvalidUserRole;
  } else {
    const toUserCollection = {
      uid: data?.uid,
      userRole: data?.userRole,
      createdAt: data?.createdAt,
    };

    try {
      const addedUser = await setDoc(
        doc(db, collections.USERS, data.uid),
        toUserCollection
      );

      // Add to respective collection
      switch (toUserCollection.userRole) {
        case DOCTOR_ROLE:
          await AddDoctor(data);
          break;

        case PATIENT_ROLE:
          await AddPatient(data);
          break;
      }

      return addedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
