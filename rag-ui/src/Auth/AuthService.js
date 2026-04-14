import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { doc, setDoc, getDoc,getDocs,collection } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";

const provider = new GoogleAuthProvider();

/* 🔧 Extract college from email */
export const getCollegeFromEmail = (email) => {
  const domain = email.split("@")[1]; // pccoepune.edu
  const name = domain.split(".")[0];  // pccoepune
  return name.toLowerCase();
};

/* ✅ Student Email Signup */
export const signupStudentEmail = async (email, password, college) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  await setDoc(doc(db, "users", user.uid), {
    email,
    role: "student",
    college,
    createdAt: new Date()
  });

  return user;
};

/* 🔐 Admin Signup */
export const signupAdmin = async (email, password) => {
  const domain = getCollegeFromEmail(email); // pccoepune
  

  // 🔥 Fetch allowed domains from Firestore
  const snapshot = await getDocs(collection(db, "colleges"));

  let matchedCollege = null;

  snapshot.forEach((doc) => {
    const data = doc.data();
    
    if (data.colleges_name === domain) {
      matchedCollege = data.colleges_name;
    }
  });

  // ❌ Not allowed
  if (!matchedCollege) {
    throw new Error("Unauthorized admin email");
  }

  // ✅ Create user
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  await sendEmailVerification(user);
  

  // 💾 Save
  await setDoc(doc(db, "users", user.uid), {
    email,
    role: "admin",
    college: matchedCollege,
    createdAt: new Date()
  });

  return user;
};

/* ✅ Google Signup */
export const signupWithGoogle = async () => {
  const res = await signInWithPopup(auth, provider);
  const user = res.user;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return { user, isNew: true };
  }

  return { user, isNew: false, data: snap.data() };
};

/* 💾 Save Google Student after selecting college */
export const saveGoogleStudent = async (user, college) => {
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    role: "student",
    college,
    createdAt: new Date()
  });
};