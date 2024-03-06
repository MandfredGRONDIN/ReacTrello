import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { getTaskById } from '../utils/task/read';
import { UserContext } from '../context/userContext';
import { updateTask } from '../utils/task/update';
import { getStatus } from '../utils/status/read';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles';

const TaskId = ({ route }) => {
    const { taskId } = route.params;
    const [task, setTask] = useState(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newStatusId, setNewStatusId] = useState(null); // Changez le nom de l'état local pour le nouvel ID de statut
    const [statuses, setStatuses] = useState([]); // Ajoutez l'état local pour stocker les statuts
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
        fetchStatuses(); // Appelez la fonction pour récupérer les statuts
    }, [taskId, project]);

    const fetchTaskDetails = async () => {
        if (taskId && project) {
            try {
                const taskData = await getTaskById(project.id, taskId);
                setTask(taskData);
                setNewTaskTitle(taskData.title);
                setNewTaskDescription(taskData.description);
                setNewStatusId(taskData.statusIndex); 
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de la tâche :', error);
            }
        }
    };

    const fetchStatuses = async () => {
        try {
            const statusesData = await getStatus(project.id);
            setStatuses(statusesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des statuts :', error);
        }
    };

    const handleUpdateTask = async () => {
        try {
            const updatedTaskData = {
                title: newTaskTitle,
                description: newTaskDescription,
                statusIndex: newStatusId // Utiliser le nouvel ID de statut
            };
            await updateTask(project.id, taskId, updatedTaskData);
            setTask({ ...task, ...updatedTaskData });
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
                    {/* Sélecteur de statut */}
                    <Text>Statut actuel : {task.statusIndex !== null && statuses.find(status => status.id === task.statusIndex) ? statuses.find(status => status.id === task.statusIndex).title : 'Non défini'}</Text>
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
                            <Picker
                            selectedValue={newStatusId}
                            onValueChange={(itemValue) => setNewStatusId(itemValue)}
                            style={styles.input}
                            >
                            <Picker.Item label="Select status" value={null} />
                            {statuses.map((status, index) => (
                            <Picker.Item key={index} label={status.title} value={status.id} />
                            ))}
                    </Picker>
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
