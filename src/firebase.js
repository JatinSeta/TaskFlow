import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCezAiaY2Hgt0jomePZGTHWM6dNqYIGWT0",
  authDomain: "task-mangement-c5328.firebaseapp.com",
  databaseURL: "https://task-mangement-c5328-default-rtdb.firebaseio.com",
  projectId: "task-mangement-c5328",
  storageBucket: "task-mangement-c5328.firebasestorage.app",
  messagingSenderId: "343865498871",
  appId: "1:343865498871:web:cd7a4313accd79d44887f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export {auth,db}