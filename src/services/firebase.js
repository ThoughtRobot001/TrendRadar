import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc
} from 'firebase/firestore';

let firebaseApp;
let authClient;
let firestore;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const initFirebase = () => {
  if (firebaseApp || !firebaseConfig.apiKey) {
    return;
  }
  firebaseApp = initializeApp(firebaseConfig);
  authClient = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
};

export const getAuthClient = () => authClient ?? (firebaseConfig.apiKey ? getAuth() : null);
export const getDb = () => firestore ?? (firebaseConfig.apiKey ? getFirestore() : null);

export const loginWithEmail = (email, password) => signInWithEmailAndPassword(getAuthClient(), email, password);
export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(getAuthClient(), email, password);
export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuthClient(), provider);
};
export const logout = () => signOut(getAuthClient());

export const fetchProductsFromFirestore = async () => {
  const db = getDb();
  if (!db) {
    return [];
  }
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
};

export const fetchProductFromFirestore = async (id) => {
  const db = getDb();
  if (!db) {
    return null;
  }
  const snapshot = await getDoc(doc(db, 'products', id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const upsertWatchlist = async (userId, productIds) => {
  const db = getDb();
  if (!db) {
    return;
  }

  await setDoc(doc(db, 'watchlists', userId), { productIds, updatedAt: new Date().toISOString() });
};

export const fetchWatchlist = async (userId) => {
  const db = getDb();
  if (!db) {
    return [];
  }
  const snapshot = await getDoc(doc(db, 'watchlists', userId));
  if (!snapshot.exists()) {
    return [];
  }
  return snapshot.data().productIds ?? [];
};
