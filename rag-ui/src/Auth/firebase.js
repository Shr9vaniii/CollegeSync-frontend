import {getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDMKUJYjski1Bvlq0dYpJ1G8NfPyS8jG5A",
  authDomain: "collegesync-76127.firebaseapp.com",
  projectId: "collegesync-76127",
  storageBucket: "collegesync-76127.firebasestorage.app",
  messagingSenderId: "665629806439",
  appId: "1:665629806439:web:2459fb107b850ad46969c2",
  measurementId: "G-Y7YF4EV0DL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);
export const db=getFirestore(app);