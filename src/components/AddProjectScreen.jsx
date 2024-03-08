import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { createProject } from '../utils/project/create'
import { UserContext } from '../context/userContext'
import { styles } from '../styles/styles'

const AddProjectScreen = ({ navigation }) => {
    const { user, setProject } = useContext(UserContext)
    const [newProjectTitle, setNewProjectTitle] = useState('')
    const [newProjectDescription, setNewProjectDescription] = useState('')

    const handleAddProject = async () => {
        try {
            const projectId = await createProject(
                newProjectTitle,
                newProjectDescription,
                user.uid,
            )
            setNewProjectTitle('')
            setNewProjectDescription('')

            handleProjectSelection(projectId)
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet :", error)
        }
    }

    const handleProjectSelection = (projectId) => {
        setProject({
            id: projectId,
            title: newProjectTitle,
            description: newProjectDescription,
            createdBy: user.uid,
            members: [],
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter un projet</Text>
            <TextInput
                style={styles.input}
                placeholder="Titre du projet"
                value={newProjectTitle}
                onChangeText={setNewProjectTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description du projet"
                value={newProjectDescription}
                onChangeText={setNewProjectDescription}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddProject}>
                <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddProjectScreen
