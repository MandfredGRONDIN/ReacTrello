// src/screen/EditStatusScreen.jsx
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import { getStatusById } from '../../utils/status/read';
import { updateStatus } from '../../utils/status/update';
import { UserContext } from '../../context/userContext';
const EditStatusScreen = ({ route }) => {
    const { project } = useContext(UserContext);
    const { statusId } = route.params;
    const [status, setStatus] = useState(null);
    const [newStatusTitle, setNewStatusTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStatusDetails();
    }, []);

    const fetchStatusDetails = async () => {
        try {
            const statusData = await getStatusById(project.id, statusId);
            setStatus(statusData); // Assurez-vous que statusData n'est pas null
            setNewStatusTitle(statusData.title); // Assurez-vous que statusData a une propriété "title"
            setLoading(false);
        } catch (error) {
            console.error('Error fetching status:', error);
            Alert.alert('Error', 'Failed to fetch status.');
            setLoading(false);
        }
    };

    const handleUpdateStatus = async () => {
        try {
            await updateStatus(project.id, statusId, { title: newStatusTitle });
            Alert.alert('Success', 'Titre du statut mis à jour avec succès.');
        } catch (error) {
            console.error('Error updating status title:', error);
            Alert.alert('Error', 'Failed to update status title.');
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Chargement...</Text>
            ) : (
                <View>
                    {status ? (
                        <View>
                            <Text>Titre du statut actuel: {status.title}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="New status title"
                                value={newStatusTitle}
                                onChangeText={setNewStatusTitle}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleUpdateStatus}>
                                <Text style={styles.buttonText}>Modifier le statut</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text>Statut non trouvé.</Text>
                    )}
                </View>
            )}
        </View>
    );
};


export default EditStatusScreen;
