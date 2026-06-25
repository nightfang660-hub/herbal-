import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'localhost',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'wellness-local-dev',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'wellness-local-dev.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1234:web:abcd',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase SSR-safe
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Check if running on client and connection to emulator is requested
if (typeof window !== 'undefined') {
  const useEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

  if (useEmulator) {
    // Prevent double binding emulator ports when Next.js hot reloads in development
    const authInitialized = (auth as any)._emulatorInitialized;
    const firestoreInitialized = (db as any)._emulatorInitialized;
    const storageInitialized = (storage as any)._emulatorInitialized;

    if (!authInitialized) {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      (auth as any)._emulatorInitialized = true;
    }
    if (!firestoreInitialized) {
      connectFirestoreEmulator(db, '127.0.0.1', 8085);
      (db as any)._emulatorInitialized = true;
    }
    if (!storageInitialized) {
      connectStorageEmulator(storage, '127.0.0.1', 9199);
      (storage as any)._emulatorInitialized = true;
    }

    console.log('Firebase connected to local development Emulator Suite.');
  }
}

export { app, auth, db, storage };
