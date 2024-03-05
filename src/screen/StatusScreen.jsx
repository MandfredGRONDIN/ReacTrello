import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { styles } from '../styles/styles';
import { createStatus } from '../utils/status/create';
import { getStatus, deleteStatus } from '../utils/status/read';

const AddStatusScreen = ({ navigation }) => {
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

  const handleAddStatus = async () => {
    try {
      await createStatus(title); // Créer un nouveau statut
      fetchStatuses(); // Rafraîchir la liste des statuts après l'ajout
      setTitle(''); // Effacer le champ de saisie après l'ajout
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
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Status</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter status title"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddStatus}>
        <Text style={styles.buttonText}>Add Status</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 20 }]}>Status List</Text>
      <FlatList
        data={statuses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={styles.centeredView}>
            <Text>No status found.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AddStatusScreen;
