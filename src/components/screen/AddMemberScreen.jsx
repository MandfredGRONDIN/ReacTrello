import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, SafeAreaView } from 'react-native';
import { UserContext } from '../../context/userContext';
import { styles } from '../../styles/styles';
import { addMemberToProject, getMembersByProjectId, removeMemberFromProject } from '../../utils/project/update'; 
import { getUserByEmail } from '../../utils/auth/getUser';

const AddMemberScreen = () => {
    const { project, user } = useContext(UserContext);
    const [memberEmail, setMemberEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const membersData = await getMembersByProjectId(project.id);
            setMembers(membersData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching members:', error);
            setLoading(false);
            Alert.alert('Error', 'Failed to fetch members.');
        }
    };

    const handleAddMember = async () => {
        try {
            if (!project) {
                throw new Error('Aucun projet sélectionné');
            }
    
            const memberId = await getUserByEmail(memberEmail.toLowerCase()); 
            await addMemberToProject(project.id, memberId.id);
            Alert.alert('Succès', 'Membre ajouté au projet avec succès.');
            setMemberEmail('');
            fetchMembers();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du membre au projet :', error);
            setError(error.message);
            Alert.alert('Erreur', error.message);
        }
    };

    const handleRemoveMember = async (memberId) => {
        try {
            await removeMemberFromProject(project.id, memberId, user.uid);
            fetchMembers();
            Alert.alert('Succès', 'Membre supprimé du projet avec succès.');
        } catch (error) {
            console.error('Erreur lors de la suppression du membre du projet :', error);
            Alert.alert('Erreur', 'Impossible de supprimer le membre du projet.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
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
            <Text style={[styles.title, { marginTop: 20 }]}>Membres du projet</Text>
            <FlatList
                data={members}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.statusItem}>
                        <Text>{item.email}</Text>
                        {user.uid === project.createdBy && (
                            <TouchableOpacity onPress={() => handleRemoveMember(item.id)}>
                                <Text style={styles.removeButtonText}>Supprimer</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.centeredView}>
                        <Text>Aucun membre trouvé.</Text>
                    </View>
                )}
            />

        </SafeAreaView>
    );
};

export default AddMemberScreen;
