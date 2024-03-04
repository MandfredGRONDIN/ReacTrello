import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from './src/context/userContext';
import UserTabs from './src/routes/userTabs';
import ProjectTabs from './src/routes/projectTabs'
import TaskTabs from './src/routes/taskTabs';

export default function App() {
  const [user, setUser] = useState()
  const [project, setProject] = useState()

  return (
    <UserContext.Provider value={{ user, setUser, project, setProject}}>
      <NavigationContainer>
      {user ? (
          !project ? (
            <ProjectTabs/>
              ) : (
            <TaskTabs/>) 
      ) : (
          <UserTabs />
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

