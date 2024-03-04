// src/routes/taskTabs.jsx
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import AddTask from '../screen/AddTaskScreen';
import BoardScreen from '../screen/BoardScreen';


const Tab = createMaterialBottomTabNavigator();

const projectTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Task' component={BoardScreen} />
            <Tab.Screen name='AddTask' component={AddTask} />
        </Tab.Navigator>
    );
}


export default projectTabs;
