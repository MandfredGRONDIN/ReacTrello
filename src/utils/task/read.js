import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase/app'
import { query } from 'firebase/database'

export async function getTasksByProjectId(projectId) {
    try {
        const tasksCollection = collection(
            firestore,
            `projects/${projectId}/tasks`,
        )
        const tasksQuery = query(tasksCollection)
        const querySnapshot = await getDocs(tasksQuery)
        const tasks = []

        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() })
        })

        return tasks
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error)
        throw new Error('Impossible de récupérer les tâches.')
    }
}

export async function getTaskById(projectId, taskId) {
    try {
        const taskRef = doc(firestore, `projects/${projectId}/tasks`, taskId)
        const taskDoc = await getDoc(taskRef)

        if (taskDoc.exists()) {
            return { id: taskDoc.id, ...taskDoc.data() }
        } else {
            throw new Error('Tâche introuvable.')
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la tâche :', error)
        throw new Error('Impossible de récupérer la tâche.')
    }
}
