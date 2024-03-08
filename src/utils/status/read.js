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
        console.error('Error getting statuses: ', error)
        throw new Error('Unable to get statuses.')
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
            throw new Error('Status not found.')
        }
    } catch (error) {
        console.error('Error getting status:', error)
        throw new Error('Unable to get status.')
    }
}
