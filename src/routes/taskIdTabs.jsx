import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BoardScreen from '../screen/BoardScreen';
import TaskId from '../screen/TaskScreen'
import EditStatusScreen from '../components/screen/EditStatusScreen'

const Stack = createStackNavigator();

const TaskIdTabs = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Vos tâches' component={BoardScreen}
            options={{
                headerStyle: { backgroundColor: '#F0F0F0' },
            }}
             />
            <Stack.Screen name='TaskId' component={TaskId} />
            <Stack.Screen name='EditStatusScreen' component={EditStatusScreen} />
        </Stack.Navigator>
    );
}

export default TaskIdTabs;
