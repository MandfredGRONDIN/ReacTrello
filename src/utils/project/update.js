import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

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
