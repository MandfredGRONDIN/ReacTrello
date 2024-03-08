import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function createStatus(projectId, title) {
    try {
        const statusCollection = collection(
            firestore,
            `projects/${projectId}/status`,
        )
        const newStatusRef = await addDoc(statusCollection, {
            title: title,
        })
        console.log(
            "Nouveau statut ajouté avec l'identifiant : ",
            newStatusRef.id,
        )
        return newStatusRef.id
    } catch (error) {
        console.error("Erreur lors de l'ajout du statut : ", error)
        throw new Error('Impossible de créer le statut.')
    }
}
