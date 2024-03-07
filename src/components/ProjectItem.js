import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import { styles } from '../styles/styles';

const ProjectItem = ({ project, onDeleteProject, onSelectProject, index }) => {
  const animatedValue = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    const animationDelay = 250 * index; 

    const timeoutId = setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: 0, 
        duration: 500, 
        useNativeDriver: true 
      }).start(); 
    }, animationDelay);

    return () => clearTimeout(timeoutId); 
  }, [index]);

  return (
    <Animated.View style={{ transform: [{ translateX: animatedValue }] }}>
      <SafeAreaView>
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
      </SafeAreaView>
    </Animated.View>
  );
};

export default ProjectItem;
