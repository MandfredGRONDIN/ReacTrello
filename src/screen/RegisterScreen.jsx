import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { createUser } from '../utils/auth/createUser';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigation = useNavigation(); 

  const handleRegister = async () => {
    if (pass === confirm) {
      try {
        await createUser(login.toLowerCase(), pass);
        Alert.alert("Un lien de vérification a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception pour continuer.", "", [
          { text: "OK", onPress: () => navigation.navigate('login') } 
        ]);
      } catch (error) {
        console.log(error);
        Alert.alert(error.message);
      }
    } else {
      Alert.alert('Mots de passes différents');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enregistrement</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirmez votre mot de passe"
        secureTextEntry={true}
        value={confirm}
        onChangeText={setConfirm}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
