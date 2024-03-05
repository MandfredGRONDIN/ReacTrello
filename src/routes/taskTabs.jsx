// src/routes/taskTabs.jsx
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import AddTask from '../screen/AddTaskScreen';
import AddMember from '../screen/AddMemberScreen';
import TaskIdTabs from './taskIdTabs';
import StatusListScreen from '../screen/StatusListScreen';


const Tab = createMaterialBottomTabNavigator();

const TaskTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Task' component={TaskIdTabs} />
            <Tab.Screen name='AddTask' component={AddTask} />

            <Tab.Screen name='AddStatus' component={StatusListScreen} />

            <Tab.Screen name='AddMember' component={AddMember} />

        </Tab.Navigator>
    );
}


export default TaskTabs;
