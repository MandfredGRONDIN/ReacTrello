import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function deleteTask(projectId, taskId) {
    try {
        const taskRef = doc(firestore, `projects/${projectId}/tasks`, taskId);
        await deleteDoc(taskRef);
        console.log("Task deleted:", taskId);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Unable to delete task.");
    }
}

