import React, { useContext, useState } from 'react'
import { TouchableOpacity, Text, TextInput, SafeAreaView } from 'react-native'
import { UserContext } from '../context/userContext'
import { updateProject } from '../utils/project/update'
import { styles } from '../styles/styles'

const UpdateProjectScreen = ({ route, navigation }) => {
    const { project } = route.params
    const { setProject } = useContext(UserContext)

    const [newTitle, setNewTitle] = useState(project.title)
    const [newDescription, setNewDescription] = useState(project.description)

    const handleUpdateProject = async () => {
        try {
            await updateProject(project.id, {
                title: newTitle,
                description: newDescription,
            })
            setProject({
                ...project,
                title: newTitle,
                description: newDescription,
            })
            navigation.goBack()
        } catch (error) {
            console.error('Erreur lors de la mise à jour du projet :', error)
        }
    }

    return (
        <SafeAreaView style={styles.taskContain}>
            <Text style={styles.projectTitle}>
                Titre du projet: {project.title}
            </Text>
            <Text style={styles.projectDescription}>
                Description: {project.description}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nouveau titre du projet"
                value={newTitle}
                onChangeText={setNewTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Nouvelle description du projet"
                value={newDescription}
                onChangeText={setNewDescription}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateProject}
            >
                <Text style={styles.buttonText}>Mettre à jour le projet</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default UpdateProjectScreen
