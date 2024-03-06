import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function deleteStatus(projectId, statusId) {
    try {
        const statusRef = doc(firestore, `projects/${projectId}/status`, statusId);
        await deleteDoc(statusRef);
        console.log("Status deleted:", statusId);
    } catch (error) {
        console.error("Error deleting status:", error);
        throw new Error("Unable to delete status.");
    }
}
