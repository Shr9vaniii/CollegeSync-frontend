import { auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

/* ✅ Email Login */
export const loginWithEmail = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  const user = res.user;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("User not found");
  }

  const data = snap.data();

  // 🔐 Admin must be verified
  if (data.role === "admin" && !user.emailVerified) {
    throw new Error("Please verify your email before logging in");
  }

  return { user, data };
};

/* ✅ Google Login (Students only) */
export const loginWithGoogle = async () => {
  const res = await signInWithPopup(auth, provider);
  const user = res.user;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return { user, isNew: true };
  }

  return { user, isNew: false, data: snap.data() };
};