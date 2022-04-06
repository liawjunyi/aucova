// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGQW8OKvc5A89i29uwBLE84gNGSFNpYDM",
  authDomain: "test-5bf59.firebaseapp.com",
  databaseURL: "https://test-5bf59-default-rtdb.firebaseio.com",
  projectId: "test-5bf59",
  storageBucket: "test-5bf59.appspot.com",
  messagingSenderId: "447167392558",
  appId: "1:447167392558:web:65357aa6c01452bb6f28bf",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
