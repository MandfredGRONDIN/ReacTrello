// src/utils/auth/createUser.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/app"

const ERROR_MESSAGES = {
    "auth/email-already-in-use": "L'adresse e-mail est déjà utilisée par un autre compte.",
    "auth/invalid-email": "L'adresse e-mail est invalide.",
    "auth/weak-password": "Le mot de passe est trop faible.",
    "auth/user-not-found": "Aucun utilisateur trouvé avec cette adresse e-mail.",
    "auth/wrong-password": "Le mot de passe est incorrect."
};

export async function createUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        const userId = userCredential.user.uid;

        const userData = {
            email: email,
        };

        const db = getFirestore();
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, userData);

        return userCredential.user;
    }
    catch (error) {
        const errorMessage = ERROR_MESSAGES[error.code] || "Une erreur s'est produite lors de la création de l'utilisateur.";
        console.error("Error creating user:", error); // Ajoutez cette ligne pour afficher l'erreur dans la console
        throw new Error(errorMessage);
    }
}
