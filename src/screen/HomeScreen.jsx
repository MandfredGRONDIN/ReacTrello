import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../context/userContext';
import createProject from '../utils/project/create'
import getProjects from '../utils/project/read'
import deleteProject from '../utils/project/delete'
import addMemberToProject from '../utils/project/update'

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);

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
    try {
      const newProjectId = await createProject('Nouveau projet', 'Description du nouveau projet', user.id);
      setProjects([...projects, { id: newProjectId, title: 'Nouveau projet', description: 'Description du nouveau projet', createdBy: user.id, members: [user.id] }]);
    } catch (error) {
      console.error('Error creating project:', error);
      // Gérer l'erreur de création du projet
    }
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Ajouter un projet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
