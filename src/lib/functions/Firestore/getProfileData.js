import { db } from '@/lib/firebase';
import { getDoc } from '@firebase/firestore';
import { doc } from '@firebase/firestore';

const getProfileData = async (uid, role) => {
  const documentReference = doc(db, role, uid);
  const documentData = await getDoc(documentReference);

  return documentData;
};
export default getProfileData;
