// src/screen/StatusListScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { styles } from '../styles/styles';
import { createStatus } from '../utils/status/create';
import { getStatus } from '../utils/status/read';
import { deleteStatus } from '../utils/status/delete'

const AddStatusListScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const statusesData = await getStatus();
      setStatuses(statusesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching statuses:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch statuses.');
    }
  };

  const handleEditStatus = (statusId) => {
    navigation.navigate('StatusId', { statusId });
  };

  const handleAddStatus = async () => {
    try {
      if (statuses.some(status => status.title === title)) {
        Alert.alert('Error', 'Un status avec ce titre existe déjà.');
        return;
      }
  
      await createStatus(title);
      fetchStatuses();
      setTitle('');
    } catch (error) {
      console.error('Error adding status:', error);
      Alert.alert('Error', 'Failed to add status.');
    }
  };

  const handleDeleteStatus = async (statusId) => {
    try {
      await deleteStatus(statusId);
      setStatuses(statuses.filter(status => status.id !== statusId));
      Alert.alert('Success', 'Status deleted successfully.');
    } catch (error) {
      console.error('Error deleting status:', error);
      Alert.alert('Error', 'Failed to delete status.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.statusItem}>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={() => handleDeleteStatus(item.id)}>
        <Text>Supprimer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEditStatus(item.id)}>
        <Text>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un status</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer le titre du status"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddStatus}>
        <Text style={styles.buttonText}>Ajouter Status</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 20 }]}>Liste des status</Text>
      <FlatList
        data={statuses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={styles.centeredView}>
            <Text>Pas de status trouver.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AddStatusListScreen;
