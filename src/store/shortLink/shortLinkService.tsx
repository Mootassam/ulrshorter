import authAxios from "../../modules/shared/axios/authAxios";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { database } from "../../firebase";
import Date from "../../modules/shared/date";

export const fetchLinks = async () => {
  try {
    const q = query(collection(database, "links"), orderBy("date", "desc"));

    return new Promise<any[]>((resolve, reject) => {
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          resolve(data); // Resolve the promise with the updated data
        },
        (error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
};

export const generateShortLinks = async (url: any) => {
  try {
    const response = await authAxios.post("/create", { url: url });
    return response.data.data.tiny_url;
  } catch (error) {
    console.log("error generating the links");
  }
};

export const saveLink = async (original, short) => {
  try {
    await addDoc(collection(database, "links"), {
      date: Date.createdAt(),
      originallink: original,
      shortlink: short,
      status: "active",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const saveMulti = async (original) => {
  try {
    return new Promise(async (resolve, reject) => {
      const idDoc = await addDoc(collection(database, "multiLinks"), {
        date: Date.createdAt(),
        links: original,
        status: "active",
      });
      resolve(idDoc.id);
      reject((error) => {
        error;
      });
    });
  } catch (error) {}
};
