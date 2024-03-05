// src/screen/TaskScreen.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getTaskById } from '../utils/task/read'; // Importez la fonction pour récupérer les informations de la tâche
import { UserContext } from '../context/userContext';

const TaskId = ({ route }) => {
    const { taskId } = route.params; // Récupérez l'ID de la tâche à partir des paramètres de la route
    const [task, setTask] = useState(null); // État pour stocker les informations de la tâche
    const { project } = useContext(UserContext); // Récupérez le projet actif à partir du contexte

    useEffect(() => {
        // Assurez-vous qu'un ID de tâche est disponible avant de récupérer les informations de la tâche
        if (taskId && project) {
            // Fonction asynchrone pour récupérer les informations de la tâche
            const fetchTaskDetails = async () => {
                try {
                    const taskData = await getTaskById(project.id, taskId); // Récupérez les informations de la tâche
                    setTask(taskData);
                } catch (error) {
                    console.error('Erreur lors de la récupération des informations de la tâche :', error);
                    // Gérer l'erreur si nécessaire
                }
            };

            fetchTaskDetails(); // Appelez la fonction pour récupérer les informations de la tâche
        }
    }, [taskId, project]); // Déclenchez l'effet chaque fois que l'ID de la tâche ou le projet change

    return (
        <View>
            {/* Affichez les informations de la tâche */}
            {task ? (
                <View>
                    <Text>Titre de la tâche : {task.title}</Text>
                    <Text>Description de la tâche : {task.description}</Text>
                    {/* Affichez d'autres détails de la tâche si nécessaire */}
                </View>
            ) : (
                <Text>Chargement des informations de la tâche...</Text>
            )}
        </View>
    );
};

export default TaskId;
