import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const ProjectItem = ({ project, onDeleteProject, onSelectProject }) => {
  return (
    <>
      <TouchableOpacity style={styles.projectContainer} onPress={() => onSelectProject(project.id)}>
        <View style={styles.projectContent}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteProject(project.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.projectDelimiter} />
    </>
  );
};

export default ProjectItem;
