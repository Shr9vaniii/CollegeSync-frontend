import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const testFirestore = async () => {
  try {
    await addDoc(collection(db, "test"), {
      message: "Hello Firestore 🚀",
      createdAt: new Date()
    });

    console.log("Data added!");
  } catch (err) {
    console.error(err);
  }
};