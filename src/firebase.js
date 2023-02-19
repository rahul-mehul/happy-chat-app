
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4i092krq-S2hC5LG9xoBP5Zqd02Qd84o",
    authDomain: "happychat-f869e.firebaseapp.com",
    projectId: "happychat-f869e",
    storageBucket: "happychat-f869e.appspot.com",
    messagingSenderId: "1067215280932",
    appId: "1:1067215280932:web:71ee3eebb5952f36b2f1b1"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()