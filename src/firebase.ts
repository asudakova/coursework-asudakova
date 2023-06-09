// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_AUTH_API_KEY,
    authDomain: 'where-to-go-ceb3e.firebaseapp.com',
    projectId: 'where-to-go-ceb3e',
    storageBucket: 'where-to-go-ceb3e.appspot.com',
    messagingSenderId: '195568024357',
    appId: '1:195568024357:web:5f79e4232c3f945f9bb8cc',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
