import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createProject } from '../../utils/project/create';
import { UserContext } from '../../context/userContext'; 
import { styles } from '../../styles/styles';

const AddProjectScreen = () => {
  const { user } = useContext(UserContext); 

  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleAddProject = async () => {
    try {
      await createProject(newProjectTitle, newProjectDescription, user.uid); 
      setNewProjectTitle('');
      setNewProjectDescription('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du projet :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un projet</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre du projet"
        value={newProjectTitle}
        onChangeText={setNewProjectTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description du projet"
        value={newProjectDescription}
        onChangeText={setNewProjectDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProjectScreen;