import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const TaskList = ({ tasks, onDeleteTask, onSelectTask }) => {
  return (
      <FlatList
        style={styles.tasksContainer}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskItem} onPress={() => onSelectTask(item.id)}>
            <View style={styles.taskItemContainer}>
              <View>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => onDeleteTask(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
  );
};

export default TaskList;
