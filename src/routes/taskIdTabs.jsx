import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import BoardScreen from '../screen/BoardScreen'
import TaskId from '../screen/TaskScreen'
import EditStatusScreen from '../components/EditStatusScreen'
import UpdateProjectScreen from '../components/UpdateProjectScreen'

const Stack = createStackNavigator()

const TaskIdTabs = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Vos tâches"
                component={BoardScreen}
                options={{
                    headerStyle: { backgroundColor: '#F0F0F0' },
                }}
            />
            <Stack.Screen
                name="ProjectModification"
                component={UpdateProjectScreen}
                options={{
                    headerStyle: { backgroundColor: '#F0F0F0' },
                }}
            />
            <Stack.Screen
                name="TaskId"
                component={TaskId}
                options={{
                    headerStyle: { backgroundColor: '#F0F0F0' },
                }}
            />
            <Stack.Screen
                name="EditStatusScreen"
                component={EditStatusScreen}
                options={{
                    headerStyle: { backgroundColor: '#F0F0F0' },
                }}
            />
        </Stack.Navigator>
    )
}

export default TaskIdTabs
