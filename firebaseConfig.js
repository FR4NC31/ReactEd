import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjY3hrH6Qm4W-qt7tDb2710EDthNoTVzo",
  authDomain: "reacted-59c1f.firebaseapp.com",
  projectId: "reacted-59c1f",
  storageBucket: "reacted-59c1f.firebasestorage.app",
  messagingSenderId: "614109349010",
  appId: "1:614109349010:web:26f0c0ca12f29cbb5e124b",
  measurementId: "G-RX0VQ2ZEWR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);