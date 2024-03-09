import { doc, updateDoc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { firestore } from '../firebase/app'

export async function deleteFile(filePath, projectId, taskId) {
    try {
        const storage = getStorage()
        const fileRef = ref(storage, filePath)

        await deleteObject(fileRef)

        await updateTaskFilePathInDatabase(projectId, taskId, null)

        console.log('Fichier supprimé avec succès.')
    } catch (error) {
        console.error('Erreur lors de la suppression du fichier :', error)
        throw new Error('Impossible de supprimer le fichier.')
    }
}

async function updateTaskFilePathInDatabase(projectId, taskId, newFilePath) {
    try {
        const taskDocRef = doc(firestore, `projects/${projectId}/tasks`, taskId)

        await updateDoc(taskDocRef, {
            filePath: newFilePath,
        })

        console.log('Chemin du fichier mis à jour dans la base de données.')
    } catch (error) {
        console.error(
            'Erreur lors de la mise à jour du chemin du fichier dans la base de données :',
            error,
        )
        throw new Error(
            'Impossible de mettre à jour le chemin du fichier dans la base de données.',
        )
    }
}
