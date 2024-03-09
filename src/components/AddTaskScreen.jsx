import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../styles/styles'
import { UserContext } from '../context/userContext'
import { createTask } from '../utils/task/create'
import { getStatus } from '../utils/status/read'

const AddTaskScreen = ({ navigation }) => {
    const { project } = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [statusIndex, setStatusIndex] = useState('')
    const [statuses, setStatuses] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchStatuses()
        })

        return unsubscribe
    }, [navigation])

    useEffect(() => {
        fetchStatuses()
    }, [])

    const fetchStatuses = async () => {
        try {
            const statusesData = await getStatus(project.id)
            setStatuses(statusesData)
            setLoading(false)
        } catch (error) {
            console.error('Erreur lors de la récupération des statuts :', error)
            setLoading(false)
            Alert.alert('Erreur', 'Échec de la récupération des statuts.')
        }
    }

    const handleAddTask = async () => {
        try {
            const statusId = statusIndex === '' ? null : statuses[statusIndex].id
            console.log(selectedFile)
            await createTask(project.id, title, description, statusId, selectedFile)
            setTitle('')
            setDescription('')
            setSelectedFile(null)
            Alert.alert("Ajout de la tâche")
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche :", error)
            Alert.alert('Erreur', "Échec de l'ajout de la tâche.")
        }
    }

    const handleFileSelection = async () => {
        try {
            console.log("Sélection du fichier en cours...");
            const file = await DocumentPicker.getDocumentAsync();
            console.log("Fichier sélectionné :", file);

            if (!file.canceled) {
                const selectedFile = file.assets[0];
                console.log("Fichier sélectionné :", selectedFile);

                if (selectedFile && /\.(jpg|jpeg|png|gif)$/i.test(selectedFile.name)) {
                    if (selectedFile.size < 250 * 1024 * 1024) {
                        setSelectedFile(selectedFile);
                    } else {
                        Alert.alert('Erreur', 'Fichier trop volumineux (max 250mo).');
                    }
                } else {
                    Alert.alert('Erreur', 'Seules les images au format jpg/jpeg/png/gif sont autorisées.');
                }
            } else {
                console.log("L'utilisateur a annulé la sélection de fichier.");
            }
        } catch (error) {
            console.error('Erreur lors de la sélection du fichier :', error);
        }
    };



    const isStatusSelected = statusIndex !== ''

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter une tâche</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrer le titre d'une tâche"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Entrer une description de tâche"
                value={description}
                onChangeText={setDescription}
            />
            <Picker
                selectedValue={statusIndex}
                onValueChange={(itemValue) => setStatusIndex(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Selectionner un status" value="" />
                {statuses.map((status, index) => (
                    <Picker.Item
                        key={index}
                        label={status.title}
                        value={index}
                    />
                ))}
            </Picker>
            <TouchableOpacity
                style={styles.fileSelectionButton}
                onPress={handleFileSelection}
            >
                <Text style={styles.fileSelectionButtonText}>Sélectionner un fichier</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                    !isStatusSelected && { backgroundColor: '#ccc' },
                ]}
                onPress={isStatusSelected ? handleAddTask : null}
                disabled={!isStatusSelected}
            >
                <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddTaskScreen
