import { updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function addMemberToProject(projectId, memberId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId)

        const projectDoc = await getDoc(projectRef)
        const currentMembers = projectDoc.data().members || []

        const updatedMembers = arrayUnion(...currentMembers, memberId)

        await updateDoc(projectRef, { members: updatedMembers })

        console.log('Membre ajouté au projet :', memberId)
    } catch (error) {
        console.error("Erreur lors de l'ajout du membre au projet :", error)
        throw new Error("Impossible d'ajouter le membre au projet.")
    }
}
