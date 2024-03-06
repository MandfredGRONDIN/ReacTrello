import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../../context/userContext';
import { addMemberToProject } from '../../utils/project/update'; 
import { getUserIdByEmail } from '../../utils/auth/getUser';
import { styles } from '../../styles/styles';

const AddMemberScreen = () => {
    const { project } = useContext(UserContext);
    const [memberEmail, setMemberEmail] = useState('');
    const [error, setError] = useState(null);

    const handleAddMember = async () => {
        try {
            if (!project) {
                throw new Error('Aucun projet sélectionné');
            }

            const memberId = await getUserIdByEmail(memberEmail);
            
            await addMemberToProject(project.id, memberId);
            Alert.alert('Succès', 'Membre ajouté au projet avec succès.');
            setMemberEmail('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du membre au projet :', error);
            setError(error.message);
            Alert.alert('Erreur', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter un membre au projet</Text>
            <TextInput
                style={styles.input}
                placeholder="Adresse e-mail du membre"
                value={memberEmail}
                onChangeText={setMemberEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddMember}>
                <Text style={styles.buttonText}>Ajouter Membre</Text>
            </TouchableOpacity>
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
};

export default AddMemberScreen;
