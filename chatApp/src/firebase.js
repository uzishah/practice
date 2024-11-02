import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSdr-cJugwrZO-msSKpftQHdqtMkIWqxI",
  authDomain: "chat-app-4c390.firebaseapp.com",
  projectId: "chat-app-4c390",
  storageBucket: "chat-app-4c390.firebasestorage.app",
  messagingSenderId: "478913382856",
  appId: "1:478913382856:web:9fe3471ed22ba0fd1e98fd",
  measurementId: "G-F12LKF5ZN7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
