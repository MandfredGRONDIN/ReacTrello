import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function createProject(title, description, userId) {
    try {
        const projectsCollection = collection(firestore, 'projects')
        const newProjectRef = await addDoc(projectsCollection, {
            title: title,
            description: description,
            createdBy: userId,
            members: [],
        })
        console.log("Nouveau projet ajouté avec l'ID: ", newProjectRef.id)

        const statusCollection = collection(
            firestore,
            `projects/${newProjectRef.id}/status`,
        )

        const defaultStatuses = [
            { title: 'À faire' },
            { title: 'En cours' },
            { title: 'Terminé' },
        ]

        for (const status of defaultStatuses) {
            await addDoc(statusCollection, status)
        }

        return newProjectRef.id
    } catch (error) {
        console.error("Erreur lors de l'ajout du projet: ", error)
        throw new Error('Impossible de créer un projet.')
    }
}
