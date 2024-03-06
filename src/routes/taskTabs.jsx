// src/routes/taskTabs.jsx
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import AddTask from '../components/screen/AddTaskScreen';
import AddMember from '../components/screen/AddMemberScreen';
import TaskIdTabs from './taskIdTabs';
import StatusListScreen from '../screen/StatusListScreen';

const Tab = createMaterialBottomTabNavigator();

const TaskTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name='Tâches' 
                component={TaskIdTabs} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="list" size={24} color={color} /> 
                    ),
                }}
            />
            <Tab.Screen 
                name='Nouvelle tâche' 
                component={AddTask} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="add-circle" size={24} color={color} /> 
                    ),
                }}
            />
            <Tab.Screen 
                name='Status' 
                component={StatusListScreen} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="add-circle-outline" size={24} color={color} /> 
                    ),
                }}
            />
            <Tab.Screen 
                name='Membre' 
                component={AddMember} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-add" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default TaskTabs;
