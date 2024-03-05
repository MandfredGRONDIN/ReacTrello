// src/screen/BoardScreen.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../context/userContext';
import { styles } from '../styles/styles';
import { getTasksByProjectId } from '../utils/task/read'; 
import { getStatus } from '../utils/status/read';
import { deleteTask } from '../utils/task/delete';

const BoardScreen = ({ navigation }) => {
    const { project, setProject } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        // Fetch project tasks and statuses
        const fetchData = async () => {
            try {
                const tasksData = await getTasksByProjectId(project.id);
                setTasks(tasksData);
                
                const statusesData = await getStatus();
                setStatuses(statusesData);
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'Failed to fetch data.');
            }
        };

        fetchData();
    }, [project]);

    const handleNavigateToProjects = () => {
        setProject(null);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(project.id, taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
            Alert.alert('Error', 'Failed to delete task.');
        }
    };

    const handleTaskSelection = (taskId) => {
        navigation.navigate('TaskId', { taskId });
    };

    // Group tasks by status
    const groupedTasks = statuses.map(status => ({
        status,
        tasks: tasks.filter(task => task.statusIndex === status.id)
    }));
    // Filter tasks without status
    const tasksWithoutStatus = tasks.filter(task => task.statusIndex === undefined || task.statusIndex === null);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateToProjects} style={styles.navigateButton}>
                <Text style={styles.navigateButtonText}>Navigate to Projects</Text>
            </TouchableOpacity>

            {/* Render tasks without status */}
            {tasksWithoutStatus.length > 0 && (
                <View style={styles.projectInfoContainer}>
                    <Text style={styles.projectTitle}>Tasks without Status</Text>
                    <FlatList
                        style={styles.tasksContainer}
                        data={tasksWithoutStatus}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.taskItem} onPress={() => handleTaskSelection(item.id)}>
                                <Text style={styles.taskTitle}>{item.title}</Text>
                                <Text style={styles.taskDescription}>{item.description}</Text>
                                <TouchableOpacity
                                    onPress={() => handleDeleteTask(item.id)}
                                    style={styles.deleteButton}
                                >
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

            {/* Render tasks grouped by status */}
            {groupedTasks.map(group => (
                group.tasks.length > 0 && (
                    <View key={group.status.id} style={styles.projectInfoContainer}>
                        <Text style={styles.projectTitle}>{group.status.title}</Text>
                        <FlatList
                            style={styles.tasksContainer}
                            data={group.tasks}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.taskItem} onPress={() => handleTaskSelection(item.id)}>
                                    <Text style={styles.taskTitle}>{item.title}</Text>
                                    <Text style={styles.taskDescription}>{item.description}</Text>
                                    <TouchableOpacity
                                        onPress={() => handleDeleteTask(item.id)}
                                        style={styles.deleteButton}
                                    >
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )
            ))}
        </View>
    );
};

export default BoardScreen;
