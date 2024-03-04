// components/Project.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';

const Project = ({ project, onDelete }) => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.description}>{project.description}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(project.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default Project;
