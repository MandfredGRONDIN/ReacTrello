import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTaskById } from '../utils/task/read';
import { UserContext } from '../context/userContext';
import { getStatus } from '../utils/status/read';
import { styles } from '../styles/styles';
import { downloadFileToDevice, downloadUrl } from '../utils/file/read';
import { deleteFile } from '../utils/file/delete';

const TaskId = ({ route }) => {
    const { taskId } = route.params;
    const [task, setTask] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const { project } = useContext(UserContext);
    const [url, setUrl] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchTaskDetails();
            fetchStatuses();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        fetchTaskDetails();
        fetchStatuses();
    }, [taskId, project]);

    const fetchTaskDetails = async () => {
        if (taskId && project) {
            try {
                const taskData = await getTaskById(project.id, taskId);
                setTask(taskData);
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

    const handleNavigationToUpdateTask = () => {
        navigation.navigate('TaskUpdate', { taskId });
    };

    const handleDownloadFile = async () => {
        try {
            await downloadFileToDevice(task);
        } catch (error) {
            console.error("Erreur lors du téléchargement du fichier :", error);
        }
    };

    const handleDeleteImage = () => {
        Alert.alert(
            'Confirmation',
            'Voulez-vous vraiment supprimer cette image ?',
            [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Supprimer', onPress: deleteImage }
            ]
        );
    };

    const deleteImage = async () => {
        try {
            await deleteFile(task.filePath, project.id, task.id);
            console.log('L\'image a été supprimée.');
            setUrl(null);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'image :", error);
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de la suppression de l\'image.'
            );
        }
    };

    return (
        <SafeAreaView style={styles.taskContain}>
            {task ? (
                <SafeAreaView>
                    <Text style={styles.title}>Titre de la tâche : {task.title}</Text>
                    <Text style={styles.title}>Description de la tâche : {task.description}</Text>
                    <Text style={styles.title}>Statut actuel : {task.statusIndex !== null &&
                        statuses.find(status => status.id === task.statusIndex)
                        ? statuses.find(status => status.id === task.statusIndex).title
                        : 'Non défini'}
                    </Text>
                    {task.filePath && url && (
                        <TouchableOpacity style={styles.fileDeleteButton} onPress={handleDownloadFile}>
                            <Text style={styles.fileDeleteButtonText}>Télécharger et partager le fichier</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.button} onPress={handleNavigationToUpdateTask}>
                        <Text style={styles.buttonText}>Modifier la tâche</Text>
                    </TouchableOpacity>
                    {url && (
                        <TouchableOpacity onPress={() => Linking.openURL(url)} onLongPress={handleDeleteImage}>
                            <Image source={{ uri: url }} style={styles.image} />
                        </TouchableOpacity>
                    )}
                </SafeAreaView>
            ) : (
                <Text>Chargement des informations de la tâche...</Text>
            )}
        </SafeAreaView>
    );
};

export default TaskId;
