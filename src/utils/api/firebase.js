//firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzvvmQuyIkF4m-F6xJyALjNZlsmHLNbYg",
  authDomain: "trello-clone-react-native.firebaseapp.com",
  projectId: "trello-clone-react-native",
  storageBucket: "trello-clone-react-native.appspot.com",
  messagingSenderId: "652446729081",
  appId: "1:652446729081:web:76c2e6460f115dc1fca5a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app)

export { auth, database, storage }