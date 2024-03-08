import { updateDoc, doc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function updateProject(projectId, newData) {
    try {
        const projectRef = doc(firestore, 'projects', projectId)
        await updateDoc(projectRef, newData)
        console.log('Project updated:', projectId)
    } catch (error) {
        console.error('Error updating project:', error)
        throw new Error('Unable to update project.')
    }
}
