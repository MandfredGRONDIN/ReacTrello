// src/utils/project/read.js
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function getProjects() {
    try {
        const projectsCollection = collection(firestore, 'projects');
        const querySnapshot = await getDocs(projectsCollection);
        const projects = [];
        querySnapshot.forEach(doc => {
            projects.push({ id: doc.id, ...doc.data() });
        });
        return projects;
    } catch (error) {
        console.error("Error getting projects: ", error);
        throw new Error("Unable to get projects.");
    }
}

export async function getProjectById(projectId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId);
        const projectDoc = await getDoc(projectRef);
        
        if (projectDoc.exists()) {
            return { id: projectDoc.id, ...projectDoc.data() };
        } else {
            throw new Error("Project not found.");
        }
    } catch (error) {
        console.error("Error getting project:", error);
        throw new Error("Unable to get project.");
    }
}