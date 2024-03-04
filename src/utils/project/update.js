// src/utils/project/update.js
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function addMemberToProject(projectId, memberId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId);
        await updateDoc(projectRef, {
            members: firestore.FieldValue.arrayUnion(memberId)
        });
        console.log("Member added to project:", memberId);
    } catch (error) {
        console.error("Error adding member to project:", error);
        throw new Error("Unable to add member to project.");
    }
}
