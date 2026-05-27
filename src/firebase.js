import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Replace with your Firebase project config from
// https://console.firebase.google.com → Project Settings → Your apps
const firebaseConfig = {
  apiKey: "AIzaSyAHTmGcZZL7sha3HdTDLAEOr4I2wtna1d8",
  authDomain: "family-choice-clinix.firebaseapp.com",
  projectId: "family-choice-clinix",
  storageBucket: "family-choice-clinix.firebasestorage.app",
  messagingSenderId: "138561581695",
  appId: "1:138561581695:web:160155129df121d8a4c54a"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app
