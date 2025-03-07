// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore for storing user details
import { getStorage } from "firebase/storage"; // Firebase Storage (if needed)

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdIIhhKfKL3HWCozqXWu_nllZY9hRfeQM",
  authDomain: "mindmendauth-8a640.firebaseapp.com",
  projectId: "mindmendauth-8a640",
  storageBucket: "mindmendauth-8a640.appspot.com",  // Fixed incorrect domain
  messagingSenderId: "253353343887",
  appId: "1:253353343887:web:e7bb6a8afa729367dae9fa",
  measurementId: "G-55L8SDSJFH"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase Services
const auth = getAuth(app);  
const db = getFirestore(app);  // Firestore Database
const storage = getStorage(app);  // Firebase Storage

// Export services
export { app, auth, db, storage };

