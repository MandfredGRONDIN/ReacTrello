import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase/app'

export async function getProjects() {
    try {
        const projectsCollection = collection(firestore, 'projects')
        const querySnapshot = await getDocs(projectsCollection)
        const projects = []
        querySnapshot.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() })
        })
        return projects
    } catch (error) {
        console.error('Erreur lors de la récupération des projets : ', error)
        throw new Error('Impossible de récupérer les projets.')
    }
}

export async function getProjectById(projectId) {
    try {
        const projectRef = doc(firestore, 'projects', projectId)
        const projectDoc = await getDoc(projectRef)

        if (projectDoc.exists()) {
            return { id: projectDoc.id, ...projectDoc.data() }
        } else {
            throw new Error('Projet introuvable.')
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du projet : ', error)
        throw new Error('Impossible de récupérer le projet.')
    }
}
