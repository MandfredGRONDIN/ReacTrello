import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { getTaskById } from '../utils/task/read';
import { UserContext } from '../context/userContext';
import { updateTask } from '../utils/task/update';
import { styles } from '../styles/styles';

const TaskId = ({ route }) => {
    const { taskId } = route.params;
    const [task, setTask] = useState(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [showInputs, setShowInputs] = useState(false); 
    const { project } = useContext(UserContext);
    const navigation = useNavigation(); 

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchTaskDetails();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        fetchTaskDetails();
    }, [taskId, project]);

    const fetchTaskDetails = async () => {
        if (taskId && project) {
            try {
                const taskData = await getTaskById(project.id, taskId);
                setTask(taskData);
                setNewTaskTitle(taskData.title);
                setNewTaskDescription(taskData.description);
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de la tâche :', error);
            }
        }
    };

    const handleUpdateTask = async () => {
        try {
            await updateTask(project.id, taskId, {
                title: newTaskTitle,
                description: newTaskDescription,
            });
            setTask({ ...task, title: newTaskTitle, description: newTaskDescription });
            setNewTaskTitle('');
            setNewTaskDescription('');
            setShowInputs(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
        }
    };

    return (
        <View>
            {task ? (
                <View>
                    <Text>Titre de la tâche : {task.title}</Text>
                    <Text>Description de la tâche : {task.description}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setShowInputs(!showInputs)}>
                        <Text style={styles.buttonText}>{showInputs ? 'Annuler la modification' : 'Faire une modification'}</Text>
                    </TouchableOpacity>
                    {showInputs && (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Nouveau titre de la tâche"
                                value={newTaskTitle}
                                onChangeText={setNewTaskTitle}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nouvelle description de la tâche"
                                value={newTaskDescription}
                                onChangeText={setNewTaskDescription}
                            />
                        </>
                    )}
                    {showInputs && (
                        <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
                            <Text style={styles.buttonText}>Mettre à jour</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <Text>Chargement des informations de la tâche...</Text>
            )}
        </View>
    );
};

export default TaskId;
