// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCylqiyi7joNRULxDa8-4eBYmBYgZMEJ9I",
  authDomain: "ai-meeting-notes-2796f.firebaseapp.com",
  projectId: "ai-meeting-notes-2796f",
  storageBucket: "ai-meeting-notes-2796f.firebasestorage.app",
  messagingSenderId: "844967782549",
  appId: "1:844967782549:web:8d6aae70024aba9cc7d39c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
