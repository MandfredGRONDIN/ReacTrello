import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { UserContext } from '../context/userContext';
import { styles } from '../styles/styles';
import { getTasksByProjectId } from '../utils/task/read'; 
import { getStatus } from '../utils/status/read';
import { deleteTask } from '../utils/task/delete';
import { updateProject } from '../utils/project/update'; 
import TaskList from '../components/TaskList';

const BoardScreen = ({ navigation }) => {
  const { project, setProject } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    if (project) {
      setNewTitle(project.title);
      setNewDescription(project.description);
      const fetchTasks = async () => {
        try {
          const tasksData = await getTasksByProjectId(project.id);
          setTasks(tasksData);
          const statusesData = await getStatus();
          setStatuses(statusesData);
        } catch (error) {
          console.error('Erreur lors de la récupération des tâches :', error);
        }
      };
      fetchTasks();
    }
  }, [project]);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(project.id, taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  const handleTaskSelection = (taskId) => {
    navigation.navigate('TaskId', { taskId });
  };
  
  const handleUpdateProject = async () => {
    try {
      await updateProject(project.id, {
        title: newTitle,
        description: newDescription
      });
      setProject({ ...project, title: newTitle, description: newDescription });
      Alert.alert('Succès', 'Projet mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet :', error);
      Alert.alert('Erreur', 'Impossible de mettre à jour le projet. Veuillez réessayer plus tard.');
    }
  };

  const tasksWithoutStatus = tasks.filter(task => task.statusIndex === undefined || task.statusIndex === null);

  const groupedTasks = statuses.map(status => ({
    status,
    tasks: tasks.filter(task => task.statusIndex === status.id)
  }));

  const renderTaskItem = ({ item }) => {
    const animatedValue = new Animated.Value(300); // Valeur initiale pour translateY
    Animated.timing(animatedValue, {
        toValue: 0, // Valeur finale pour translateY
        duration: 500, // Durée de l'animation en millisecondes
        useNativeDriver: true // Utilise le pilote natif pour les performances
    }).start(); // Démarre l'animation

    return (
        <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
            <TouchableOpacity style={styles.taskItem} onPress={() => handleTaskSelection(item.id)}>
                <View style={styles.taskItemContainer}>
                    <View>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text style={styles.taskDescription}>{item.description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setProject(null)} style={styles.navigateButton}>
        <Text style={styles.navigateButtonText}>Revenir sur vos projets</Text>
      </TouchableOpacity>
      <Text style={styles.projectTitle}>Titre du projet: {project.title}</Text>
      <Text style={styles.projectDescription}>Description: {project.description}</Text>
      <TouchableOpacity style={styles.buttonShow} onPress={() => setShowInputs(!showInputs)}>
        <Text style={styles.buttonText}>{showInputs ? 'Masquer la modification' : 'Modification du projet'}</Text>
      </TouchableOpacity>
      {showInputs && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nouveau titre du projet"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Nouvelle description du projet"
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateProject}>
            <Text style={styles.buttonText}>Mettre à jour le projet</Text>
          </TouchableOpacity>
        </>
      )}
      <Text style={styles.taskTitle}>Tâches :</Text>
          {/* Render tasks */}
          <FlatList
              data={tasks}
              renderItem={renderTaskItem}
              keyExtractor={(item) => item.id.toString()}
          />

          {/* Render tasks grouped by status */}
          {statuses.map(status => (
              <View key={status.id} style={styles.projectInfoContainer}>
                  <Text style={styles.projectTitle}>{status.title}</Text>
                  <FlatList
                      data={tasks.filter(task => task.statusIndex === status.id)}
                      renderItem={renderTaskItem}
                      keyExtractor={(item) => item.id.toString()}
                  />
              </View>
        ))}

    </View>
  );
};

export default BoardScreen;
