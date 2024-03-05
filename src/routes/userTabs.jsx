import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from '../screen/LoginScreen';
import Register from '../screen/RegisterScreen';

const Tab = createMaterialBottomTabNavigator();

const UserTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name='login' 
                component={Login} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="login" size={24} color={color} /> 
                    ),
                }}
            />
            <Tab.Screen 
                name='register' 
                component={Register} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-plus" size={24} color={color} /> 
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default UserTabs;
