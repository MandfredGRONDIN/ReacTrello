import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../context/userContext';
import { getProjects } from '../utils/project/read.js'
import { deleteProject } from '../utils/project/delete.js'
import { addMemberToProject } from '../utils/project/update.js'

const HomeScreen = ({ navigation, route }) => {
  const { user, setProject } = useContext(UserContext);
  const [projects, setProjects] = useState([]);

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
            <>
              <TouchableOpacity style={styles.projectContainer} onPress={() => handleProjectSelection(item.id)}>
                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>{item.title}</Text>
                  <Text style={styles.projectDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteProject(item.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              {/* Ajoutez la délimitation après chaque élément de projet */}
              <View style={styles.projectDelimiter} />
            </>
          )}
        />
      ) : (
        <Text>Aucun projet trouvé.</Text>
      )}
    </View>
  );
};

export default HomeScreen;