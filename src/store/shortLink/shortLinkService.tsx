import authAxios from "../../modules/shared/axios/authAxios";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {  database, } from "../../firebase";

export const generateShortLinks = async (url: any) => {
  try {
    const response = await authAxios.post("/create", { url: url });
    return response.data.data.tiny_url;
  } catch (error) {
    console.log("error generating the links");
  }
};

export const fetchLinks = async () => {
  try {
    const q = query(collection(database, "links"), orderBy("date", "desc")); // Change "timestamp" to the actual field you want to use for ordering
    onSnapshot(q, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return newData;
    });
  } catch (error) {}
};
