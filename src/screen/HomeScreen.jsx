import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../context/userContext';
import { createProject } from '../utils/project/create.js'
import { getProjects } from '../utils/project/read.js'
import { deleteProject } from '../utils/project/delete.js'
import { addMemberToProject } from '../utils/project/update.js'

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Gérer l'erreur de chargement des projets
    }
  };

  const handleAddProject = async () => {
    setShowForm(true);
  };

  const handleSubmitProject = async () => {
    try {
      const newProjectId = await createProject(newProjectTitle, newProjectDescription, user.id);
      setProjects([...projects, { id: newProjectId, title: newProjectTitle, description: newProjectDescription, createdBy: user.id, members: [user.id] }]);
      setNewProjectTitle('');
      setNewProjectDescription('');
      setShowForm(false);
    } catch (error) {
      console.error('Error creating project:', error);
      // Gérer l'erreur de création du projet
    }
  };

  const handleCancelAddProject = () => {
    setNewProjectTitle('');
    setNewProjectDescription('');
    setShowForm(false);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      // Gérer l'erreur de suppression du projet
    }
  };

  const handleEditProject = (projectId) => {
    Alert.alert('Modifier le projet', 'Cette fonctionnalité n\'est pas encore implémentée.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des projets</Text>
      {showForm ? (
        <View>
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
          <TouchableOpacity style={styles.button} onPress={handleSubmitProject}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancelAddProject}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Ajouter un projet</Text>
        </TouchableOpacity>
      )}
      {projects.length > 0 ? (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.projectItem} onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}>
              <Text style={styles.projectTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleEditProject(item.id)}>
                <Text style={styles.editButton}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteProject(item.id)}>
                <Text style={styles.deleteButton}>Supprimer</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Aucun projet trouvé.</Text>
      )}
    </View>
  );
};

export default HomeScreen;
