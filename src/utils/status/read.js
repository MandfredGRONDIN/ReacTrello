import { collection, doc, getDocs, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function getStatus(projectId) {
    try {
        const statusCollection = collection(
            firestore,
            `projects/${projectId}/status`,
        )
        const querySnapshot = await getDocs(statusCollection)
        const statuses = []
        querySnapshot.forEach((doc) => {
            statuses.push({ id: doc.id, ...doc.data() })
        })
        return statuses
    } catch (error) {
        console.error('Erreur lors de la récupération des statuts : ', error)
        throw new Error('Impossible de récupérer les statuts.')
    }
}

export async function getStatusById(projectId, statusId) {
    try {
        const statusRef = doc(
            firestore,
            `projects/${projectId}/status`,
            statusId,
        )
        const statusDoc = await getDoc(statusRef)

        if (statusDoc.exists()) {
            return { id: statusDoc.id, ...statusDoc.data() }
        } else {
            throw new Error('Statut introuvable.')
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du statut :', error)
        throw new Error('Impossible de récupérer le statut.')
    }
}
