  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCI1LIYukQ8MXNQUfvuLCu2RS-PQMj44Gs",
    authDomain: "mindmend-c2e7c.firebaseapp.com",
    projectId: "mindmend-c2e7c",
    storageBucket: "mindmend-c2e7c.firebasestorage.app",
    messagingSenderId: "983855921203",
    appId: "1:983855921203:web:6023211c8b3d9ebc35cb46",
    measurementId: "G-74SLX9QCSF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth=getAuth(app);