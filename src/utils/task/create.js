// src/utils/task/create.js
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function createTask(projectId, title, description, statusIndex) {
    try {
        const tasksCollection = collection(firestore, `projects/${projectId}/tasks`);
        const newTaskRef = await addDoc(tasksCollection, {
            title: title,
            description: description,
            completed: false,
            statusIndex : statusIndex
        });
        console.log("New task added with ID: ", newTaskRef.id);
        return newTaskRef.id;
    } catch (error) {
        console.error("Error adding task: ", error);
        throw new Error("Unable to create task.");
    }
}
