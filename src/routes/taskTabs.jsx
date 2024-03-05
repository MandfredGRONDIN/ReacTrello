// src/routes/taskTabs.jsx
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import AddTask from '../screen/AddTaskScreen';
import TaskIdTabs from './taskIdTabs';
import StatusScreen from '../screen/StatusScreen';


const Tab = createMaterialBottomTabNavigator();

const TaskTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Task' component={TaskIdTabs} />
            <Tab.Screen name='AddTask' component={AddTask} />
            <Tab.Screen name='AddStatus' component={StatusScreen} />
        </Tab.Navigator>
    );
}


export default TaskTabs;
