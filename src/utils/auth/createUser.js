import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/app"

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
        return userCredential.user;
    }
    catch (error) {
        const errorMessage = ERROR_MESSAGES[error.code] || "Une erreur s'est produite lors de la création de l'utilisateur.";
        throw new Error(errorMessage);
    }
}
