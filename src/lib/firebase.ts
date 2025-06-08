
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FPIREBASE_APP_ID;

if (!apiKey) {
  throw new Error(
    "Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is missing. " +
    "Please ensure it is correctly set up in your Firebase Studio environment variables. " +
    "This key is required to initialize Firebase."
  );
}
console.log("API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// Optional: Add warnings for other potentially missing critical Firebase config values
if (!authDomain) {
  console.warn(
    "Firebase Auth Domain (NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) is missing or not set in environment variables. " +
    "This might cause issues with authentication flows."
  );
}
if (!projectId) {
  console.warn(
    "Firebase Project ID (NEXT_PUBLIC_FIREBASE_PROJECT_ID) is missing or not set in environment variables. " +
    "This might cause issues with Firebase services like Firestore, Storage, etc."
  );
}
// It's good practice to ensure all necessary config values are present for full functionality.
// For now, we'll proceed with initialization if at least the API key is present,
// but a fully configured setup is recommended.

const firebaseConfig: FirebaseOptions = {
  apiKey: apiKey, // Using the validated apiKey
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
