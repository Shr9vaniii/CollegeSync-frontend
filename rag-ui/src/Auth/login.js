import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const login= async (Email,password)=>{
    const userCred= await signInWithEmailAndPassword(auth,Email
        ,password);

    if(!userCred.user.emailVerified){
        alert('Please verify your email before logging in.');
        return;
    }
    
    console.log('User logged in:', userCred.user);
}