import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import User from '../screen/User';
import AddProject from '../screen/AddProjectScreen';
import HomeScreen from '../screen/homeScreen';


const Tab = createMaterialBottomTabNavigator();

const projectTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Project' component={HomeScreen} />
            <Tab.Screen name='AddProject' component={AddProject} />
            <Tab.Screen name='User' component={User} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default projectTabs;
