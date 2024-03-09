import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { firestore } from '../firebase/app'
import { deleteFile } from '../file/delete'
import { deleteObject, getStorage, ref } from 'firebase/storage'

export async function deleteProject(projectId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId)
        await deleteDoc(projectRef)
        console.log('Projet supprimé :', projectId)

        const taskCollectionRef = collection(
            firestore,
            `projects/${projectId}/tasks`,
        )
        const taskSnapshot = await getDocs(taskCollectionRef)
        await Promise.all(
            taskSnapshot.docs.map(async (doc) => {
                if (doc.data().filePath) {
                    await deleteProjectFile(doc.data().filePath)
                }
                await deleteDoc(doc.ref)
                console.log('Tâche supprimée :', doc.id)
            }),
        )

        const statusCollectionRef = collection(
            firestore,
            `projects/${projectId}/status`,
        )
        const statusSnapshot = await getDocs(statusCollectionRef)
        await Promise.all(
            statusSnapshot.docs.map(async (doc) => {
                await deleteDoc(doc.ref)
                console.log('Statut supprimé :', doc.id)
            }),
        )

        console.log(
            'Toutes les collections liées au projet ont été supprimées.',
        )
    } catch (error) {
        console.error('Erreur lors de la suppression du projet :', error)
        throw new Error('Impossible de supprimer le projet.')
    }
}

export async function deleteProjectFile(filePath) {
    try {
        const storage = getStorage()
        const fileRef = ref(storage, filePath)

        await deleteObject(fileRef)

        console.log('Fichier supprimé avec succès.')
    } catch (error) {
        console.error('Erreur lors de la suppression du fichier :', error)
        throw new Error('Impossible de supprimer le fichier.')
    }
}
