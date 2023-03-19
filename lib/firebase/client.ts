import { initializeApp, getApps } from 'firebase/app';

// 必要な機能をインポート
import { getAnalytics } from 'firebase/analytics';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const firebaseConfig = {
  // TODO:認証情報を設置
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!getApps()?.length) {
  // Firebaseアプリの初期化
  initializeApp(firebaseConfig);
}

// 他ファイルで使うために機能をエクスポート
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics();
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
// export const funcions = getFunctions();

const isEmulating = process.env.NODE_ENV === 'development'
if (isEmulating) {
  console.log('emulators start')
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, "localhost", 9199);
}