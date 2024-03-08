import { sendEmailVerification } from 'firebase/auth'
import { auth } from '../firebase/app'

export async function handleSendEmail() {
    try {
        const user = auth.currentUser

        if (user) {
            await sendEmailVerification(user)
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(
            "Erreur lors du renvoi de l'e-mail de vérification:",
            error,
        )
        return false
    }
}
