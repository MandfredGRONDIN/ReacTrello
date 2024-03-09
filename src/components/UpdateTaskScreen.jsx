import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, Linking, Image, Button, Alert, ScrollView } from 'react-native';
import { getTaskById } from '../utils/task/read';
import { UserContext } from '../context/userContext';
import { updateTask } from '../utils/task/update';
import { getStatus } from '../utils/status/read';
import { styles } from '../styles/styles';
import { downloadUrl } from '../utils/file/read';
import { updateFile, updateTaskFilePath } from '../utils/file/update';
import { Picker } from '@react-native-picker/picker'
import * as DocumentPicker from 'expo-document-picker';

const UpdateTaskScreen = ({ route }) => {
    const { taskId } = route.params;
    const [task, setTask] = useState(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newStatusId, setNewStatusId] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [url, setUrl] = useState();
    const [newFile, setNewFile] = useState(null);
    const { project } = useContext(UserContext);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            if (taskId && project) {
                try {
                    const taskData = await getTaskById(project.id, taskId);
                    setTask(taskData);
                    setNewTaskTitle(taskData.title);
                    setNewTaskDescription(taskData.description);
                    setNewStatusId(taskData.statusIndex);
                    if (taskData.filePath) {
                        const urlPath = await downloadUrl(taskData.filePath);
                        setUrl(urlPath);
                    }
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

        fetchTaskDetails();
        fetchStatuses();
    }, [taskId, project]);

    const handleUpdateTask = async () => {
        try {
            const updatedTaskData = {
                title: newTaskTitle,
                description: newTaskDescription,
                statusIndex: newStatusId,
            };
            await updateTask(project.id, taskId, updatedTaskData);
            setTask({ ...task, ...updatedTaskData });
            setNewTaskTitle('');
            setNewTaskDescription('');
            if (newFile) {
                await handleUpdateFile();
            }
            Alert.alert("Succès", "Tâche modifier")
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
        }
    };

    const handleUpdateFile = async () => {
        try {
            if (!task || (!task.filePath && newFile)) {
                if (newFile) {
                    await updateTaskFilePath(project.id, taskId, newFile);
                    console.log('Chemin du fichier mis à jour dans la base de données.');
                } else {
                    console.error("Aucun fichier mis à jour n'a été sélectionné.");
                }
            } else {
                if (newFile) {
                    await updateFile(task.filePath, newFile);
                    console.log('Fichier mis à jour avec succès.');
                } else {
                    console.error("Aucun fichier mis à jour n'a été sélectionné.");
                }
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du fichier :", error);
        }
    };


    const handleFileSelection = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync();

            if (!file.canceled) {
                const selectedFile = file.assets[0];

                if (selectedFile && /\.(jpg|jpeg|png|gif)$/i.test(selectedFile.name)) {
                    if (selectedFile.size < 250 * 1024 * 1024) {
                        setNewFile(selectedFile);
                    } else {
                        Alert.alert('Erreur', 'Fichier trop volumineux.');
                    }
                } else {
                    Alert.alert('Erreur', 'Seules les images sont autorisées.');
                }
            } else {
                console.log("L'utilisateur a annulé la sélection de fichier.");
            }
        } catch (error) {
            console.error('Erreur lors de la sélection du fichier :', error);
        }
    };

    return (
        <SafeAreaView style={styles.containerImages}>
            {task ? (
                <ScrollView>
                    <SafeAreaView>
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
                            <Picker.Item label="Selectionner un status" value={null} />
                            {statuses.map((status, index) => (
                                <Picker.Item key={index} label={status.title} value={status.id} />
                            ))}
                        </Picker>
                        <TouchableOpacity style={styles.fileSelectionButton} onPress={handleFileSelection}>
                            <Text style={styles.fileSelectionButtonText}>Sélectionner un fichier</Text>
                        </TouchableOpacity>
                    </SafeAreaView>

                    <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
                        <Text style={styles.buttonText}>Mettre à jour</Text>
                    </TouchableOpacity>
                    {!newFile ? (url && (
                        <TouchableOpacity onPress={() => Linking.openURL(url)}>
                            <Image style={styles.image} source={{ uri: url }} />
                        </TouchableOpacity>
                    )) : (
                        <Image source={{ uri: newFile.uri }} style={styles.image} />
                    )}
                </ScrollView>
            ) : (
                <Text>Chargement des informations de la tâche...</Text>
            )}
        </SafeAreaView>
    );
};

export default UpdateTaskScreen;
