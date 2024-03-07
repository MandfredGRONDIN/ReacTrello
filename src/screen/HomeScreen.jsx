// src/screen/HomeScreen.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../context/userContext';
import { getProjects } from '../utils/project/read.js';
import { deleteProject } from '../utils/project/delete.js';
import ProjectItem from '../components/ProjectItem.js';

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
      const filteredProjects = projectsData.filter(project => project.createdBy === user.uid || project.members.includes(user.uid));
      setProjects(filteredProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleProjectSelection = (projectId) => {
    const selectedProject = projects.find(project => project.id === projectId);
    setProject(selectedProject);
  };

  return (
    <SafeAreaView style={styles.container}>
      {projects.length > 0 ? (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProjectItem
              project={item}
              onDeleteProject={handleDeleteProject}
              onSelectProject={handleProjectSelection}
            />
          )}
        />
      ) : (
        <Text>Aucun projet trouvé.</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
