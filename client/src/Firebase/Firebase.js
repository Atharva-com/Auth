// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF-1miFZBB0WEQia-uKDHJSrgwjFYUjj0",
  authDomain: "auth-4f2c6.firebaseapp.com",
  projectId: "auth-4f2c6",
  storageBucket: "auth-4f2c6.appspot.com",
  messagingSenderId: "498325522723",
  appId: "1:498325522723:web:41790012a882f48f9a2496",
  measurementId: "G-TCDYXH479G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);