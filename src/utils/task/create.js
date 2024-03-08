import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function createTask(projectId, title, description, statusIndex) {
    try {
        const tasksCollection = collection(
            firestore,
            `projects/${projectId}/tasks`,
        )
        const newTaskRef = await addDoc(tasksCollection, {
            title: title,
            description: description,
            completed: false,
            statusIndex: statusIndex,
        })
        console.log(
            "Nouvelle tâche ajoutée avec l'identifiant : ",
            newTaskRef.id,
        )
        return newTaskRef.id
    } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche : ", error)
        throw new Error('Impossible de créer la tâche.')
    }
}
