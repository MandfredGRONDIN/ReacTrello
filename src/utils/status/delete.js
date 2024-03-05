// src/utils/status/delete.js
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function deleteStatus(statusId) {
    try {
        const statuskRef = doc(firestore, `status`, statusId);
        await deleteDoc(statuskRef);
        console.log("Task deleted:", statusId);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Unable to delete task.");
    }
}

