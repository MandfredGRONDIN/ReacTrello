// src/utils/status/update.js
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function updateStatus(statusId, newData) {
    try {
        const statusRef = doc(firestore, `status`, statusId);
        await updateDoc(statusRef, newData);
        console.log("Status updated:", statusId);
    } catch (error) {
        console.error("Error updating status:", error);
        throw new Error("Unable to update status.");
    }
}