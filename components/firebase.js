import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjQ26N24lVLUWrH_-mybAR7_edVTIwjj8",
  authDomain: "minuteai-9512b.firebaseapp.com",
  projectId: "minuteai-9512b",
  storageBucket: "minuteai-9512b.appspot.com",
  messagingSenderId: "788150108140",
  appId: "1:788150108140:web:5ea17f1cf12ea58c250ac9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();