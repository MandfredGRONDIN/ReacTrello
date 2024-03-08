import { doc, deleteDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function deleteStatus(projectId, statusId) {
    try {
        const statusRef = doc(
            firestore,
            `projects/${projectId}/status`,
            statusId,
        )
        await deleteDoc(statusRef)
        console.log('Statut supprimé :', statusId)
    } catch (error) {
        console.error('Erreur lors de la suppression du statut :', error)
        throw new Error('Impossible de supprimer le statut.')
    }
}
