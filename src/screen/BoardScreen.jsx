import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { UserContext } from '../context/userContext';
import { styles } from '../styles/styles';
import { getTasksByProjectId } from '../utils/task/read'; 
import { deleteTask } from '../utils/task/delete';
import { updateProject } from '../utils/project/update'; 

const BoardScreen = ({ navigation }) => {
    const { project, setProject } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    useEffect(() => {
        if (project) {
            setNewTitle(project.title);
            setNewDescription(project.description);
            const fetchTasks = async () => {
                try {
                    const tasksData = await getTasksByProjectId(project.id);
                    setTasks(tasksData);
                } catch (error) {
                    console.error('Erreur lors de la récupération des tâches :', error);
                }
            };

            fetchTasks();
        }
    }, [project]);

    const handleNavigateToProjects = () => {
        setProject(null);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(project.id, taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
        }
    };
    
    const handleTaskSelection = (taskId) => {
        navigation.navigate('TaskId', { taskId: taskId });
    };

    const handleUpdateProject = async () => {
        try {
            await updateProject(project.id, {
                title: newTitle,
                description: newDescription
            });
            setProject({ ...project, title: newTitle, description: newDescription });
            Alert.alert('Succès', 'Projet mis à jour avec succès.');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du projet :', error);
            Alert.alert('Erreur', 'Impossible de mettre à jour le projet. Veuillez réessayer plus tard.');
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
                    <TouchableOpacity style={styles.button} onPress={() => setShowInputs(!showInputs)}>
                        <Text style={styles.buttonText}>{showInputs ? 'Masquer la modification' : 'Modification du projet'}</Text>
                    </TouchableOpacity>
                    {showInputs && (
                        <>
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
                            <TouchableOpacity style={styles.button} onPress={handleUpdateProject}>
                                <Text style={styles.buttonText}>Mettre à jour le projet</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <Text style={styles.taskTitle}>Tâches :</Text>
                    <FlatList
                        style={styles.tasksContainer}
                        data={tasks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.taskItem} onPress={() => handleTaskSelection(item.id)}>
                                <Text style={styles.taskTitle}>{item.title}</Text>
                                <Text style={styles.taskDescription}>{item.description}</Text>
                                <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                    
                </View>
            )}
        </View>
    );
};

export default BoardScreen;
