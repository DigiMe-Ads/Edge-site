// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsIsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChf99L7VCtBBi4HsvEo_emfokl1meDOO8",
  authDomain: "edge-careers-b6023.firebaseapp.com",
  projectId: "edge-careers-b6023",
  storageBucket: "edge-careers-b6023.firebasestorage.app",
  messagingSenderId: "6245186390",
  appId: "1:6245186390:web:129fc0e38c80a2c409f4f7",
  measurementId: "G-38QCVWMQY8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics only works in a browser context that supports it (no-op during SSR/build)
analyticsIsSupported().then((supported) => {
  if (supported) getAnalytics(app);
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
