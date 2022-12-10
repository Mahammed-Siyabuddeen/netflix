import  {initializeApp} from 'firebase/app'
import {  getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth' 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhylcJD6my9VLpExwMhlrKUbdUDk3rM1g",
    authDomain: "netflix-413bb.firebaseapp.com",
    projectId: "netflix-413bb",
    storageBucket: "netflix-413bb.appspot.com",
    messagingSenderId: "796836707245",
    appId: "1:796836707245:web:136256f6530b8ac34c7f24",
    measurementId: "G-L2P1TCKEYL"
  };
 const app= initializeApp(firebaseConfig)

 const db =getFirestore(app)
 export const auth=getAuth(app)
 export{db}
