// src/components/Project.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const Project = ({ project, onDelete }) => {
    return (
        <View style={styles.projectContainer}>
            <View style={styles.projectContent}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
            </View>
            <TouchableOpacity onPress={() => onDelete(project.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Project;
