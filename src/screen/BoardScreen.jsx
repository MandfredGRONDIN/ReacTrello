// src/screen/BoardScreen.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../context/userContext';
import { styles } from '../styles/styles';
import { getTasksByProjectId } from '../utils/task/read'; // Utilisez getTasksByProjectId à la place de getTasksForProject

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

    return (
        <View style={styles.container}>
            {/* Bouton pour naviguer vers la liste des projets */}
            <TouchableOpacity onPress={handleNavigateToProjects}>
                <Text>Naviguer vers projets</Text>
            </TouchableOpacity>

            {project && (
                <View>
                    <Text>Titre du projet: {project.title}</Text>
                    <Text>Description: {project.description}</Text>
                    {/* Afficher les tâches du projet */}
                    <Text>Tâches :</Text>
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.title}</Text>
                                <Text>{item.description}</Text>
                                {/* Afficher d'autres détails de la tâche si nécessaire */}
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default BoardScreen;
