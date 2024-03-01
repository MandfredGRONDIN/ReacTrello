// ReacNativeTrello/src/screen/register.jsx
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
//import { styles } from '../styles/styles';
import { TouchableOpacity } from 'react-native';
import { createUser } from '../utils/api/auth';
import { UserContext } from '../context/userContext';

const registerScreen = () => {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const [confirm, setConfirm] = useState("")
    const { setUser } = useContext(UserContext)

    const handleRegister = async () => {
        if (pass === confirm) {
            try {
                const user = await createUser(login, pass)
                setUser(user)
            }
            catch (error) {
                console.log(error);
                Alert.alert(error.message)
            }
        }
        else {

            Alert.alert("Mots de passes différents")
        }
    }
    return (
        <View>
            <Text>Enregistrement</Text>
            <TextInput placeholder="Entrez votre email" keyboardType="email-address" value={login} onChangeText={setLogin} />
            <TextInput placeholder="Entrez votre mot de passe" secureTextEntry={true} value={pass} onChangeText={setPass} />
            <TextInput placeholder="Confirmez votre mot de passe" secureTextEntry={true} value={confirm} onChangeText={setConfirm} />
            <TouchableOpacity onPress={handleRegister}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

export default registerScreen;
