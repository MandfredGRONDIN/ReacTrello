import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BoardScreen from '../screen/BoardScreen';
import TaskId from '../screen/TaskScreen'
import StatusId from '../components/screen/EditStatusScreen'

const Stack = createStackNavigator();

const TaskIdTabs = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Vos tâches' component={BoardScreen} />
            <Stack.Screen name='TaskId' component={TaskId} />
            <Stack.Screen name='StatusId' component={StatusId} />
        </Stack.Navigator>
    );
}

export default TaskIdTabs;
