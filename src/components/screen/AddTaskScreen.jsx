import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../styles/styles';
import { UserContext } from '../../context/userContext';
import { createTask } from '../../utils/task/create';
import { getStatus } from '../../utils/status/read';

const AddTaskScreen = ({ navigation }) => {
    const { project } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [statusIndex, setStatusIndex] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const statusesData = await getStatus();
                setStatuses(statusesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching statuses:', error);
                setLoading(false);
                Alert.alert('Error', 'Failed to fetch statuses.');
            }
        };

        fetchStatuses();
    }, []);

    const handleAddTask = async () => {
        try {
            const statusId = statusIndex === '' ? null : statuses[statusIndex].id;
            await createTask(project.id, title, description, statusId);
            navigation.goBack();
        } catch (error) {
            console.error('Error adding task:', error);
            Alert.alert('Error', 'Failed to add task.');
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter task title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter task description"
                value={description}
                onChangeText={setDescription}
            />
            <Picker
                selectedValue={statusIndex}
                onValueChange={(itemValue) => setStatusIndex(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Select status (optional)" value="" />
                {statuses.map((status, index) => (
                    <Picker.Item key={index} label={status.title} value={index} />
                ))}
            </Picker>
            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddTaskScreen;
