// src/screen/loginScreen.jsx

import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { logUser } from '../utils/auth/logUser';
import { UserContext } from '../context/userContext';

const LoginScreen = () => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const user = await logUser(login, pass);
      setUser(user);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre email"
        keyboardType="email-address"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Entrez votre mot de passe"
        secureTextEntry={true}
        value={pass}
        onChangeText={setPass}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
