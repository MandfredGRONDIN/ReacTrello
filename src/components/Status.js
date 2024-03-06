// src/components/Status.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const Status = ({ status, onDelete }) => {
    return (
        <View style={styles.statusItem}>
            <View style={styles.statusContent}>
                <Text style={styles.statusTitle}>{status.title}</Text>
            </View>
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity onPress={() => onDelete(status.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onEdit(status.id)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Modifier</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Status;
