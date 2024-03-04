import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function updateTask(projectId, taskId, newData) {
    try {
        const taskRef = doc(firestore, `projects/${projectId}/tasks`, taskId);
        await updateDoc(taskRef, newData);
        console.log("Task updated:", taskId);
    } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Unable to update task.");
    }
}
