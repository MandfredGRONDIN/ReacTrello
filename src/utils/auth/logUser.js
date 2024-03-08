import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/app'

const ERROR_MESSAGES = {
    'auth/email-already-in-use':
        "L'adresse e-mail est déjà utilisée par un autre compte.",
    'auth/invalid-credential':
        "L'adresse e-mail ou le mot de passe est invalide.",
    'auth/user-not-found':
        'Aucun utilisateur trouvé avec cette adresse e-mail.',
    'auth/wrong-password': 'Le mot de passe est incorrect.',
}

export async function logUser(email, password) {
    try {
        console.log(auth, email, password)
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        )
        const user = userCredential.user
        const emailVerified = user.emailVerified

        console.log(emailVerified)
        return { user, emailVerified }
    } catch (error) {
        console.log(error)
        const errorMessage =
            ERROR_MESSAGES[error.code] ||
            "Une erreur s'est produite lors de la connexion de l'utilisateur."
        throw new Error(errorMessage)
    }
}
