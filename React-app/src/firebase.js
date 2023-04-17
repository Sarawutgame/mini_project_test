// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdMtNEBAVQOS_jx8c9Ux3JVTBZ8bRgbko",
  authDomain: "softdev-mini-project-73709.firebaseapp.com",
  projectId: "softdev-mini-project-73709",
  storageBucket: "softdev-mini-project-73709.appspot.com",
  messagingSenderId: "444235714527",
  appId: "1:444235714527:web:5d2587930c92ae64747e6a",
  measurementId: "G-ZMRTL2J8XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)