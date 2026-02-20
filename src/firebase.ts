// Firebase initialization for Subscription Tracker
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

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

// Initialize Firestore with simple persistence
const db = getFirestore(app);

// Enable offline persistence (best effort - don't block on error)
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.log('Firestore persistence disabled: multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support IndexedDB
    console.log('Firestore persistence disabled: browser not supported');
  }
});

export { app, analytics, auth, db };
