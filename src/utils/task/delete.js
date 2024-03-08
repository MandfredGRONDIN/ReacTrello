import { doc, deleteDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function deleteTask(projectId, taskId) {
    try {
        const taskRef = doc(firestore, `projects/${projectId}/tasks`, taskId)
        await deleteDoc(taskRef)
        console.log('Tâche supprimée :', taskId)
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche :', error)
        throw new Error('Impossible de supprimer la tâche.')
    }
}
