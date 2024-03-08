import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
    apiKey: 'AIzaSyDzvvmQuyIkF4m-F6xJyALjNZlsmHLNbYg',
    authDomain: 'trello-clone-react-native.firebaseapp.com',
    projectId: 'trello-clone-react-native',
    storageBucket: 'trello-clone-react-native.appspot.com',
    messagingSenderId: '652446729081',
    appId: '1:652446729081:web:76c2e6460f115dc1fca5a8',
}

const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
const database = getDatabase(app)
const storage = getStorage(app)
const firestore = getFirestore(app)

export { auth, database, storage, firestore }
