// src/screen/HomeScreen
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../context/userContext';
import { getProjects } from '../utils/project/read.js'
import { deleteProject } from '../utils/project/delete.js'
import { addMemberToProject } from '../utils/project/update.js'

const HomeScreen = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const { setProject } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProjects();
    });

    return unsubscribe;
  }, [navigation]);

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

  const handleProjectSelection = (projectId) => {
    // Trouver le projet correspondant à l'ID sélectionné
    const selectedProject = projects.find(project => project.id === projectId);
    
    // Mettre à jour le projet actif dans le contexte utilisateur
    setProject(selectedProject);
  };
  
  
  return (
    <View style={styles.container}>
      {/* Liste des projets */}
      {projects.length > 0 ? (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.projectItem} onPress={() => handleProjectSelection(item.id)}>
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
