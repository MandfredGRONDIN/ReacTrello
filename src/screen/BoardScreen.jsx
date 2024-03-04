// src/screen/BoardScreen.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../context/userContext';
import { styles } from '../styles/styles';

const BoardScreen = ({ navigation }) => {
    const {project ,setProject  } = useContext(UserContext);

    const handleNavigateToProjects = () => {
        setProject()
    };

    return (
        <View style={styles.container}>
            {/* Bouton pour naviguer vers la liste des projets */}
            <TouchableOpacity onPress={handleNavigateToProjects}>
                <Text>Naviguer vers projets</Text>
            </TouchableOpacity>

            
                <View>
                    <Text>Titre du projet: {project.title}</Text>
                    <Text>Description: {project.description}</Text>
                    {/* Afficher d'autres détails du projet si nécessaire */}
                </View>
        </View>
    );
};

export default BoardScreen;
