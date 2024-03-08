import { doc, deleteDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function deleteProject(projectId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId)
        await deleteDoc(projectRef)
        console.log('Projet supprimer:', projectId)
    } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error)
        throw new Error('Impossible de supprimer le projet.')
    }
}
