import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/app";

export async function createStatus(projectId, title) {
    try {
        const statusCollection = collection(firestore, `projects/${projectId}/status`);
        const newStatusRef = await addDoc(statusCollection, {
            title: title
        });
        console.log("New status added with ID: ", newStatusRef.id);
        return newStatusRef.id;
    } catch (error) {
        console.error("Error adding status: ", error);
        throw new Error("Unable to create status.");
    }
}
