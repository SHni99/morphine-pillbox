// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs0HpWkfd79GrCPxN8GKsTin-DSklXrh8",
  authDomain: "morphine-pillbox.firebaseapp.com",
  projectId: "morphine-pillbox",
  storageBucket: "morphine-pillbox.appspot.com",
  messagingSenderId: "982198264724",
  appId: "1:982198264724:web:f88387a5131e208c28a581",
  measurementId: "G-KPC9PY9WDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app);
const db2 = getDatabase(app);

//const authentication = getAuth(app);

const resetPassword = sendPasswordResetEmail;

const authentication = getAuth(app);

export { db, db2, authentication, resetPassword, firebase };
