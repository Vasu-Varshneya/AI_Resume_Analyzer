import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDUUGYJhlopMk5zy1qQXUO9O0Sg6H3aDWc",
  authDomain: "ai-resume-analyzer-ce9e9.firebaseapp.com",
  projectId: "ai-resume-analyzer-ce9e9",
  storageBucket: "ai-resume-analyzer-ce9e9.firebasestorage.app",
  messagingSenderId: "945501997623",
  appId: "1:945501997623:web:f5b219fe459ac530f4cdb2",
  measurementId: "G-ZVSEENGC43"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage();
export { db, storage,auth,googleProvider };