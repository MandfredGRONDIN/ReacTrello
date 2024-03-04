// src/utils/project/create.js
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function createProject(title, description, userId) {
    try {
        const projectsCollection = collection(firestore, 'projects');
        const newProjectRef = await addDoc(projectsCollection, {
            title: title,
            description: description,
            createdBy: userId,
            members: [userId]
        });
        console.log("New project added with ID: ", newProjectRef.id);
        return newProjectRef.id;
    } catch (error) {
        console.error("Error adding project: ", error);
        throw new Error("Unable to create project.");
    }
}
