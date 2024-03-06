// src/utils/auth/getUser.js
import { query, where, getDocs, collection } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function getUserIdByEmail(email) {
    try {
        const usersCollectionRef = collection(firestore, 'users');
        
        const userQuery = query(usersCollectionRef, where('email', '==', email));
        
        const querySnapshot = await getDocs(userQuery);
        
        if (!querySnapshot.empty) {
            const userId = querySnapshot.docs[0].id;
            return userId;
        } else {
            throw new Error('Utilisateur non trouvé avec cette adresse e-mail.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur par e-mail :', error);
        throw error;
    }
}
