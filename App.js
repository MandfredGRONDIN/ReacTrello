import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from './src/context/userContext';
import UserTabs from './src/routes/userTabs';

export default function App() {
  const [user, setUser] = useState()
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <UserTabs />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

