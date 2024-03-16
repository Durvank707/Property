// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "real-estate-12d11.firebaseapp.com",
  projectId: "real-estate-12d11",
  storageBucket: "real-estate-12d11.appspot.com",
  messagingSenderId: "1010922014054",
  appId: "1:1010922014054:web:51ba9f0d3c04a0a60cb4a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);