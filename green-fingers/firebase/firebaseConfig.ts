import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY ?? "",
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN ?? "",
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID ?? "",
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID ?? "",
};

let firebaseApp: FirebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
