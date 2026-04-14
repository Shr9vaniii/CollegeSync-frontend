import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const provider=new GoogleAuthProvider();

export const googleLogin= async()=>{
    try{
        const result= await signInWithPopup(auth,provider); 
        const user=result.user;
        console.log('Google user:',user);
    }catch(error){
        console.error('Google login error:',error);
    }
}