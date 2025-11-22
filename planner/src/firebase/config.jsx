import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ9EwI7fM5rh_Ti95rv1TC4XghvXeJlb8",
  authDomain: "elevate-e8cee.firebaseapp.com",
  projectId: "elevate-e8cee",
  storageBucket: "elevate-e8cee.firebasestorage.app",
  messagingSenderId: "784219107412",
  appId: "1:784219107412:web:9b7027904aed0682567dc1",
  measurementId: "G-9KFMD2DY0T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, firebaseConfig };