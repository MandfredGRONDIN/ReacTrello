// src/utils/status/read.js
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/app";
import { query } from "firebase/database";

export async function getStatus() {
    try {
        const projectsCollection = collection(firestore, 'status');
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

export async function getStatusById(statusId) {
    try {
        const statusRef = doc(firestore, `status`, statusId);
        const statusDoc = await getDoc(statusRef);

        if (statusDoc.exists()) {
            return { id: statusDoc.id, ...statusDoc.data() };
        } else {
            throw new Error("Status not found.");
        }
    } catch (error) {
        console.error("Error getting status:", error);
        throw new Error("Unable to get status.");
    }
}
