import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import User from '../screen/UserScreen'
import AddProject from '../components/AddProjectScreen'
import HomeScreen from '../screen/HomeScreen'

const Tab = createMaterialBottomTabNavigator()

const projectTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Projets"
                component={HomeScreen}
                initialParams={{ refresh: Math.random() }}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Nouveau projet"
                component={AddProject}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profil"
                component={User}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default projectTabs
