import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function removeMemberFromProject(
    projectId,
    memberId,
    currentUserUid,
) {
    try {
        const projectRef = doc(firestore, 'projects', projectId)
        const projectDoc = await getDoc(projectRef)
        const currentMembers = projectDoc.data().members || []
        const createdBy = projectDoc.data().createdBy

        if (currentUserUid !== createdBy) {
            throw new Error(
                'Seul le créateur du projet peut supprimer des membres du projet',
            )
        }

        const updatedMembers = currentMembers.filter(
            (member) => member !== memberId,
        )

        await updateDoc(projectRef, { members: updatedMembers })

        console.log('Membre supprimé du projet :', memberId)
    } catch (error) {
        console.error(
            'Erreur lors de la suppression du membre du projet :',
            error,
        )
        throw new Error('Impossible de supprimer le membre du projet.')
    }
}
