// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUKCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    appId:process.env.REACT_APP_APP_ID
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// instance from firebase module
export const firebaseInstance = firebase;

// 서비스만 export 
export const authService = firebase.auth();