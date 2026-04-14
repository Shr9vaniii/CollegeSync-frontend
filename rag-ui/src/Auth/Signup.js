import {createUserWithEmailAndPassword,sendEmailVerification} from 'firebase/auth';
import {auth} from './firebase';

export const signup = async(email,password)=>{
    const usercred= await createUserWithEmailAndPassword(auth,email,password);
    await sendEmailVerification(usercred.user);

    alert('Verification email sent. Please check your inbox and verify your email before logging in.');
}