import { db } from "@/lib/firebase";
import { collection, getDocs } from "@firebase/firestore";

/**
 * The function `getAllData` retrieves all documents from a specified collection in a Firestore
 * database and returns them as an array of data objects.
 * @param collectionName - The `collectionName` parameter in the `getAllData` function represents the
 * name of the collection in Firestore from which you want to retrieve all the documents.
 * @returns The `getAllData` function is returning an array of all the data objects retrieved from the
 * specified collection in Firestore. Each object in the array represents a document in the collection,
 * containing the data stored in that document.
 */

export const getAllData = async (collectionName) => {
    const data = await getDocs(collection(db, collectionName));
    const allData = [];

    data.forEach((doc) => {
        allData.push(doc.data());
    });

    return allData;
};  