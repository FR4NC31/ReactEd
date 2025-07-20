import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDt-dvKxHZfhdZj7bQMi-ihD-O6kWP6odc",
  authDomain: "reacted-598ca.firebaseapp.com",
  projectId: "reacted-598ca",
  storageBucket: "reacted-598ca.firebasestorage.app",
  messagingSenderId: "801167053970",
  appId: "1:801167053970:web:5a4926150a26835b05c24b",
  measurementId: "G-B68HH12QV3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);