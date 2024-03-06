import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function updateStatus(projectId, statusId, newData) {
    try {
        const statusRef = doc(firestore, `projects/${projectId}/status`, statusId);
        await updateDoc(statusRef, newData);
        console.log("Status updated:", statusId);
    } catch (error) {
        console.error("Error updating status:", error);
        throw new Error("Unable to update status.");
    }
}
