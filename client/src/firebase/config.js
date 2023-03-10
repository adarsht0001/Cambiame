/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBvgDFW3JpvDI2LYyen0FPVFpId-ze6PA0',
  authDomain: 'social-6c19b.firebaseapp.com',
  projectId: 'social-6c19b',
  storageBucket: 'social-6c19b.appspot.com',
  messagingSenderId: '1046867719935',
  appId: '1:1046867719935:web:a5b9be6f1032c0d679feca',
  measurementId: 'G-NNTNT6NHR3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
