import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function updateStatus(projectId, statusId, newData) {
    try {
        const statusRef = doc(
            firestore,
            `projects/${projectId}/status`,
            statusId,
        )
        await updateDoc(statusRef, newData)
        console.log('Statut mis à jour :', statusId)
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut :', error)
        throw new Error('Impossible de mettre à jour le statut.')
    }
}
