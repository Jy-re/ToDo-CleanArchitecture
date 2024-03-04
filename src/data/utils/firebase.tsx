import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDuvXUV5HLFL4Jl07F0FPddrr5tJ3YmUXU",
  authDomain: "todoapp-9adaf.firebaseapp.com",
  projectId: "todoapp-9adaf",
  storageBucket: "todoapp-9adaf.appspot.com",
  messagingSenderId: "992582971810",
  appId: "1:992582971810:web:f5edf1e4b817ada7bb42fb",
  measurementId: "G-LPTTE3FW9N"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);