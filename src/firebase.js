import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Hatalı olan satırı bununla değiştiriyoruz:
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDxmOVttszm8I9qNmBEfGeDCIIjNxKhnmo",
  authDomain: "bitiklabakici.firebaseapp.com",
  projectId: "bitiklabakici",
  storageBucket: "bitiklabakici.firebasestorage.app",
  messagingSenderId: "896967426503",
  appId: "1:896967426503:web:b46679f2b7b9d3200899e2",
  measurementId: "G-YV6ZK98QEC"
};

const app = initializeApp(firebaseConfig);

// Dışarıya aktarımlar
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // Kimlik doğrulama artık hazır