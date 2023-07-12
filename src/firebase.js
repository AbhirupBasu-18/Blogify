// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhIqwi8_ZHR1EZtSbbSWLFSPMo2t5BjrA",
  authDomain: "react-blogify.firebaseapp.com",
  projectId: "react-blogify",
  storageBucket: "react-blogify.appspot.com",
  messagingSenderId: "973372860386",
  appId: "1:973372860386:web:c31aef83c4bbc6a60cfbbb",
  measurementId: "G-Q88257CYD7"
};

// Initialize Firebase
//firebase services
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);
export {auth,db,storage};