// src/utils/task/read.js
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function getTasksByProjectId(projectId) {
    try {
        const tasksCollection = collection(firestore, `projects/${projectId}/tasks`);
        const tasksQuery = query(tasksCollection);
        const querySnapshot = await getDocs(tasksQuery);
        const tasks = [];
        
        querySnapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });

        return tasks;
    } catch (error) {
        console.error("Error getting tasks:", error);
        throw new Error("Unable to get tasks.");
    }
}

export async function getTaskById(projectId, taskId) {
    try {
        const taskRef = doc(firestore, `projects/${projectId}/tasks`, taskId);
        const taskDoc = await getDoc(taskRef);

        if (taskDoc.exists()) {
            return { id: taskDoc.id, ...taskDoc.data() };
        } else {
            throw new Error("Task not found.");
        }
    } catch (error) {
        console.error("Error getting task:", error);
        throw new Error("Unable to get task.");
    }
}
