// src/utils/project/update.js
import { updateDoc, doc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { firestore } from "../firebase/app";
import { getUserById } from "../auth/getUser";

export async function updateProject(projectId, newData) {
    try {
        const projectRef = doc(firestore, 'projects', projectId);
        await updateDoc(projectRef, newData);
        console.log("Project updated:", projectId);
    } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Unable to update project.");
    }
}

export async function addMemberToProject(projectId, memberId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId);
        
        const projectDoc = await getDoc(projectRef);
        const currentMembers = projectDoc.data().members || [];

        const updatedMembers = arrayUnion(...currentMembers, memberId);

        await updateDoc(projectRef, { members: updatedMembers });
        
        console.log("Member added to project:", memberId);
    } catch (error) {
        console.error("Error adding member to project:", error);
        throw new Error("Unable to add member to project.");
    }
}

export async function getMembersByProjectId(projectId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId);
        const projectDoc = await getDoc(projectRef);

        if (projectDoc.exists()) {
            const memberIds = projectDoc.data().members || [];
            const membersWithEmail = await Promise.all(memberIds.map(async memberId => {
                const user = await getUserById(memberId);
                return { id: memberId, email: user.email };
            }));
            return membersWithEmail;
        } else {
            throw new Error('Project not found');
        }
    } catch (error) {
        console.error('Error fetching project members:', error);
        throw new Error('Failed to fetch project members.');
    }
}

export async function removeMemberFromProject(projectId, memberId, currentUserUid) {
    try {
        const projectRef = doc(firestore, 'projects', projectId);
        const projectDoc = await getDoc(projectRef);
        const currentMembers = projectDoc.data().members || [];
        const createdBy = projectDoc.data().createdBy;

        if (currentUserUid !== createdBy) {
            throw new Error('Seul createdBy peut supprimer des membres du projet');
        }

        const updatedMembers = currentMembers.filter(member => member !== memberId);

        await updateDoc(projectRef, { members: updatedMembers });
        
        console.log("Membre supprimé du projet :", memberId);
    } catch (error) {
        console.error("Erreur lors de la suppression du membre du projet :", error);
        throw new Error("Impossible de supprimer le membre du projet.");
    }
}
