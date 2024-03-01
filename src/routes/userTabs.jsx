import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import Login from '../screen/loginScreen';
import Register from '../screen/registerScreen';


const Tab = createMaterialBottomTabNavigator();

const UserTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='login' component={Login} />
            <Tab.Screen name='register' component={Register} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default UserTabs;