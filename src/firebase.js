import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA52e5-ZMD3LR-GsN1MeMD4BqXoWre_o9Q",
  authDomain: "lui-shop.firebaseapp.com",
  projectId: "lui-shop",
  storageBucket: "lui-shop.appspot.com",
  messagingSenderId: "1008813508608",
  appId: "1:1008813508608:web:6853e1d3ff7d55aa11b0e5",
  measurementId: "G-SY76DPPX8Q"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { analytics,auth,db };