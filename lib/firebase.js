// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAYXeahMvnX-ltZpP7bXWfd4Rd05frPPY",
  authDomain: "minuteai-44f9c.firebaseapp.com",
  projectId: "minuteai-44f9c",
  storageBucket: "minuteai-44f9c.firebasestorage.app",
  messagingSenderId: "627634892622",
  appId: "1:627634892622:web:6db39dbf3f9521178ef81f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


