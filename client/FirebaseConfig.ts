// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAFgReaZk6W-jdoIwyi_lvZwkws76ElFqM",
  authDomain: "mindmend74.firebaseapp.com",
  projectId: "mindmend74",
  storageBucket: "mindmend74.firebasestorage.app",
  messagingSenderId: "437992035588",
  appId: "1:437992035588:web:f98943fb9cdbebeb7f2c51",
  measurementId: "G-291R39VTN6"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP); 
