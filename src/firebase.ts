// Firebase initialization for Subscription Tracker
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByGhcAHo9FEmCiE7MZA_Uwi9faGbYHz34",
  authDomain: "subscription-tracker-a6c30.firebaseapp.com",
  projectId: "subscription-tracker-a6c30",
  storageBucket: "subscription-tracker-a6c30.appspot.com",
  messagingSenderId: "605694892750",
  appId: "1:605694892750:web:4f3a30c9b27a7fd0d60e9f",
  measurementId: "G-E8E0C7K4GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Firestore with modern cache API (multi-tab support)
const db = getFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

export { app, analytics, auth, db };
