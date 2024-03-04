// src/utils/firebase/app.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDzvvmQuyIkF4m-F6xJyALjNZlsmHLNbYg",
  authDomain: "trello-clone-react-native.firebaseapp.com",
  projectId: "trello-clone-react-native",
  storageBucket: "trello-clone-react-native.appspot.com",
  messagingSenderId: "652446729081",
  appId: "1:652446729081:web:76c2e6460f115dc1fca5a8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app)
const firestore = getFirestore(app);

export { auth, database, storage, firestore }