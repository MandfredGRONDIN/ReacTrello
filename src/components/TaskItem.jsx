import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { styles } from '../styles/styles';

const TaskItem = ({ item, index, handleTaskSelection, handleDeleteTask }) => {
    const animatedValue = useRef(new Animated.Value(500)).current;

    useEffect(() => {
        const animationDelay = 500 * index;
        const timeoutId = setTimeout(() => {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, animationDelay);

        return () => clearTimeout(timeoutId);
    }, [animatedValue, index]);

    return (
        <Animated.View style={{ transform: [{ translateX: animatedValue }] }}>
            <TouchableOpacity
                style={styles.taskItem}
                onPress={() => handleTaskSelection(item.id)}
            >
                <View style={styles.taskItemContainer}>
                    <View>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text style={styles.taskDescription}>
                            {item.description}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleDeleteTask(item.id)}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteButtonText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default TaskItem;
