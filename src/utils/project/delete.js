import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function deleteProject(projectId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId);
        await deleteDoc(projectRef);
        console.log("Project deleted:", projectId);
    } catch (error) {
        console.error("Error deleting project:", error);
        throw new Error("Unable to delete project.");
    }
}
