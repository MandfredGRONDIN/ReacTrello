import React from 'react'
import { TouchableOpacity, Text, TextInput } from 'react-native'
import { styles } from '../styles/styles'

const BoardScreenHeader = ({
    project,
    setProject,
    showInputs,
    setShowInputs,
    newTitle,
    setNewTitle,
    newDescription,
    setNewDescription,
    handleUpdateProject,
    handleProjectModification,
}) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => setProject(null)}
                style={styles.navigateButton}
            >
                <Text style={styles.navigateButtonText}>
                    Revenir sur vos projets
                </Text>
            </TouchableOpacity>
            <Text style={styles.projectTitle}>
                Titre du projet: {project.title}
            </Text>
            <Text style={styles.projectDescription}>
                Description: {project.description}
            </Text>
            <TouchableOpacity
                style={styles.buttonUpdate}
                onPress={handleProjectModification}
            >
                <Text style={styles.buttonText}>Modifier le projet</Text>
            </TouchableOpacity>
        </>
    )
}

export default BoardScreenHeader
