// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// const db = getFirestore(app);
// const storage = getStorage(app);

export { app /*, db, storage */ };

// IMPORTANT:
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Add a Web app to your project.
// 3. Copy the firebaseConfig object from your project settings.
// 4. Create a .env.local file in the root of your Next.js project.
// 5. Add your Firebase config values to .env.local, prefixed with NEXT_PUBLIC_:
//    Example .env.local:
//    NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
//    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
//    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
//    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
//    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
//    NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
