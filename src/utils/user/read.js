import {
    query,
    where,
    getDocs,
    collection,
    getDoc,
    doc,
} from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function getUserByEmail(email) {
    try {
        const usersCollectionRef = collection(firestore, 'users')

        const userQuery = query(usersCollectionRef, where('email', '==', email))

        const querySnapshot = await getDocs(userQuery)

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data()
            const userId = querySnapshot.docs[0].id
            return { id: userId, email: userData.email }
        } else {
            throw new Error('Utilisateur non trouvé avec cette adresse e-mail.')
        }
    } catch (error) {
        console.error(
            "Erreur lors de la récupération de l'utilisateur par e-mail :",
            error,
        )
        throw error
    }
}

export async function getUserById(userId) {
    try {
        const userRef = doc(firestore, 'users', userId)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
            return userDoc.data()
        } else {
            throw new Error('Utilisateur non trouvé')
        }
    } catch (error) {
        console.error(
            "Erreur lors de la récupération de l'utilisateur par ID :",
            error,
        )
        throw new Error("Impossible de récupérer l'utilisateur par ID.")
    }
}

export async function getMembersByProjectId(projectId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId)
        const projectDoc = await getDoc(projectRef)

        if (projectDoc.exists()) {
            const memberIds = projectDoc.data().members || []
            const membersWithEmail = await Promise.all(
                memberIds.map(async (memberId) => {
                    const user = await getUserById(memberId)
                    return { id: memberId, email: user.email }
                }),
            )
            return membersWithEmail
        } else {
            throw new Error('Projet non trouvé')
        }
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des membres du projet :',
            error,
        )
        throw new Error('Impossible de récupérer les membres du projet.')
    }
}
