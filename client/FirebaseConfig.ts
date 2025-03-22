// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXs-LLpJScUiezCiZc1qhmwCBpb9sA7Uw",
  authDomain: "mindmend-11d90.firebaseapp.com",
  projectId: "mindmend-11d90",
  storageBucket: "mindmend-11d90.firebasestorage.app",
  messagingSenderId: "26322113812",
  appId: "1:26322113812:web:873b202715d8db896c1e01",
  measurementId: "G-CS97WME6Z5"
};

// Initialize Firebase
export const FIREBASE_APP   = initializeApp(firebaseConfig);
export const auth = getAuth(FIREBASE_APP);
