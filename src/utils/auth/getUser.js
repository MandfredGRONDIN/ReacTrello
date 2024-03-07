// src/utils/auth/getUser.js
import { query, where, getDocs, collection, getDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function getUserByEmail(email) {
    try {
        const usersCollectionRef = collection(firestore, 'users');
        
        const userQuery = query(usersCollectionRef, where('email', '==', email));
        
        const querySnapshot = await getDocs(userQuery);
        
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const userId = querySnapshot.docs[0].id;
            return { id: userId, email: userData.email };
        } else {
            throw new Error('Utilisateur non trouvé avec cette adresse e-mail.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur par e-mail :', error);
        throw error;
    }
}

export async function getUserById(userId) {
    try {
        const userRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Failed to fetch user by ID.');
    }
}