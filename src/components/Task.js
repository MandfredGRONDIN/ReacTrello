// src/components/Task.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const Task = ({ task, onDelete }) => {
    return (
        <View style={styles.taskItem}>
            <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
            </View>
            <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Task;

