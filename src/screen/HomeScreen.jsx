// ReacNativeTrello/src/screen/home.jsx

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../context/userContext';

// Simulons une liste de projets
const projectsData = [
  { id: 1, title: 'Projet 1' },
  { id: 2, title: 'Projet 2' },
  { id: 3, title: 'Projet 3' },
];

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    } else {
      // Chargez les projets de l'utilisateur depuis l'API ou un stockage local
      setProjects(projectsData); // Simulons des données statiques pour l'exemple
    }
  }, [user, navigation]);

  const handleAddProject = () => {
    // Ajoutez ici la logique pour ajouter un nouveau projet
    Alert.alert('Ajouter un projet', 'Cette fonctionnalité n\'est pas encore implémentée.');
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
