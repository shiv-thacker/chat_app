// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZWx3Wb3PSgR1qjpD0jXEzokntbboB6us",
  authDomain: "fir-chat-app-89c2d.firebaseapp.com",
  projectId: "fir-chat-app-89c2d",
  storageBucket: "fir-chat-app-89c2d.appspot.com",
  messagingSenderId: "334559862165",
  appId: "1:334559862165:web:20ad281e545d32f5eb6a9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
