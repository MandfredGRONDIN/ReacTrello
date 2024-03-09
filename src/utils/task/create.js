import { collection, addDoc, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { firestore } from '../firebase/app'

export async function createTask(
    projectId,
    title,
    description,
    statusIndex,
    file,
) {
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
            filePath: null,
        })

        if (file != null && file.uri && file.name) {
            const storage = getStorage()

            const fileRefPath = `projects/${projectId}/tasks/${newTaskRef.id}/${file.name}`
            const fileRef = ref(storage, fileRefPath)

            const response = await fetch(file.uri)
            const fileData = await response.blob()

            await uploadBytes(fileRef, fileData)

            await updateDoc(newTaskRef, {
                filePath: fileRefPath,
            })
            console.log('Chemin du fichier mis à jour dans la base de données.')
        }
        return newTaskRef.id
    } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche : ", error)
        throw new Error('Impossible de créer la tâche.')
    }
}
