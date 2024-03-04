//App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screen/LoginScreen'
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from './src/context/userContext';
import UserTabs from './src/routes/userTabs';
import Home from './src/screen/HomeScreen';
import ProjectTabs from './src/routes/ProjectTabs'
export default function App() {
  const [user, setUser] = useState()
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
      {user ? (
          <ProjectTabs />
      ) : (
          <UserTabs />
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

