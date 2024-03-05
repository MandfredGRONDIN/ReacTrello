// src/routes/taskIdTabs.jsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import BoardScreen from '../screen/BoardScreen';
import TaskId from '../screen/TaskScreen'
import StatusId from '../screen/EditStatusScreen'


const Stack = createStackNavigator();

const TaskIdTabs = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Task' component={BoardScreen} />
            <Stack.Screen name='TaskId' component={TaskId} />
            <Stack.Screen name='StatusId' component={StatusId} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default TaskIdTabs;
