import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function updateFile(filePath, newFile) {
    try {
        const storage = getStorage()
        const fileRef = ref(storage, filePath)

        const response = await fetch(newFile.uri)
        const fileData = await response.blob()

        await uploadBytes(fileRef, fileData)

        console.log('Fichier mis à jour avec succès.')
    } catch (error) {
        console.error('Erreur lors de la mise à jour du fichier :', error)
        throw new Error('Impossible de mettre à jour le fichier.')
    }
}

export async function updateTaskFilePath(projectId, taskId, newFile) {
    try {
        const storage = getStorage()
        const fileRefPath = `projects/${projectId}/tasks/${taskId}/${newFile.name}`
        const fileRef = ref(storage, fileRefPath)

        const response = await fetch(newFile.uri)
        const fileData = await response.blob()

        await uploadBytes(fileRef, fileData)

        await updateDoc(doc(firestore, `projects/${projectId}/tasks`, taskId), {
            filePath: fileRefPath,
        })

        console.log('Chemin du fichier mis à jour dans la base de données.')
    } catch (error) {
        console.error('Erreur lors de la mise à jour du fichier :', error)
        throw new Error(
            'Impossible de mettre à jour le chemin du fichier de la tâche.',
        )
    }
}
