// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKkjIMmV_2_t_eBQY5DzgHD87mOrl_AC4",
  authDomain: "netflixgpt-6aa68.firebaseapp.com",
  projectId: "netflixgpt-6aa68",
  storageBucket: "netflixgpt-6aa68.firebasestorage.app",
  messagingSenderId: "654383691436",
  appId: "1:654383691436:web:95163a713978fbbaead109",
  measurementId: "G-HZGG6M8V3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();