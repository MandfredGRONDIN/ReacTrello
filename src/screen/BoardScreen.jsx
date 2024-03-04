// src/screen/BoardScreen.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../context/userContext';
import { styles } from '../styles/styles';
import { getTasksByProjectId } from '../utils/task/read'; 
import {deleteTask} from '../utils/task/delete';

const BoardScreen = ({ navigation }) => {
    const { project, setProject } = useContext(UserContext);
    const [tasks, setTasks] = useState([]); // État pour stocker les tâches du projet

    useEffect(() => {
        // Assurez-vous qu'un projet est sélectionné avant de récupérer les tâches
        if (project) {
            // Fonction asynchrone pour récupérer les tâches liées au projet
            const fetchTasks = async () => {
                try {
                    const tasksData = await getTasksByProjectId(project.id); // Utilisez getTasksByProjectId
                    setTasks(tasksData);
                } catch (error) {
                    console.error('Erreur lors de la récupération des tâches :', error);
                    // Gérer l'erreur si nécessaire
                }
            };

            fetchTasks(); // Appelez la fonction pour récupérer les tâches
        }
    }, [project]); // Déclenchez l'effet chaque fois que le projet change

    const handleNavigateToProjects = () => {
        setProject(null); // Effacez le projet sélectionné
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(project.id, taskId); // Appelez la fonction de suppression de tâche
            // Mettez à jour l'état des tâches après la suppression de la tâche
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
            // Gérer l'erreur si nécessaire
        }
    };

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateToProjects} style={styles.navigateButton}>
            <Text style={styles.navigateButtonText}>Naviguer vers les projets</Text>
        </TouchableOpacity>

        {project && (
            <View style={styles.projectInfoContainer}>
            <Text style={styles.projectTitle}>Titre du projet: {project.title}</Text>
            <Text style={styles.projectDescription}>Description: {project.description}</Text>
            {/* Afficher les tâches du projet */}
            <Text style={styles.taskTitle}>Tâches :</Text>
            <FlatList
                style={styles.tasksContainer}
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={styles.taskItem}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text style={styles.taskDescription}>{item.description}</Text>
                    <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
                )}
            />
            </View>
        )}
        </View>
    );
};

export default BoardScreen;
