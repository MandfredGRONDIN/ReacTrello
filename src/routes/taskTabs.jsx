// src/routes/taskTabs.jsx
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import AddTask from '../screen/AddTaskScreen';
import TaskIdTabs from './taskIdTabs';


const Tab = createMaterialBottomTabNavigator();

const TaskTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Task' component={TaskIdTabs} />
            <Tab.Screen name='AddTask' component={AddTask} />
        </Tab.Navigator>
    );
}


export default TaskTabs;
