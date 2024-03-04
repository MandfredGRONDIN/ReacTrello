import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../context/userContext';
import { createTask } from '../utils/task/create'; // Importez la fonction createTask pour créer une tâche

const AddTaskScreen = () => {
  const { project } = useContext(UserContext); // Récupérez le projet actif à partir du contexte

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = async () => {
    try {
      if (!project) {
        throw new Error('Aucun projet sélectionné'); // Vérifiez si un projet est sélectionné
      }

      await createTask(project.id, newTaskTitle, newTaskDescription); // Ajoutez une tâche au projet actif
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche :', error);
      Alert.alert('Erreur', 'Impossible d\'ajouter la tâche. Veuillez réessayer plus tard.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une tâche</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre de la tâche"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description de la tâche"
        value={newTaskDescription}
        onChangeText={setNewTaskDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;
