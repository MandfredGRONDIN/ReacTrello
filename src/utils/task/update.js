import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function updateTask(projectId, taskId, newData) {
    try {
        const taskRef = doc(firestore, `projects/${projectId}/tasks`, taskId)
        await updateDoc(taskRef, newData)
        console.log('Tâche mise à jour :', taskId)
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche :', error)
        throw new Error('Impossible de mettre à jour la tâche.')
    }
}
