// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoqE0SL7qHW2x91W_8yMhaY0V44CU-xac",
  authDomain: "aucova-e72ba.firebaseapp.com",
  projectId: "aucova-e72ba",
  storageBucket: "aucova-e72ba.appspot.com",
  messagingSenderId: "204795231883",
  appId: "1:204795231883:web:3e278f45e777ff5a0f9e8e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { app, db, storage, auth };
