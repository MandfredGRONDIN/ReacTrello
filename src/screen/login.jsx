import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { logUser } from '../utils/api/auth';
import { UserContext } from '../context/userContext';

const Login = () => {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const { setUser } = useContext(UserContext)

    const handleLogin = async () => {
        try {
            const user = await logUser(login, pass)
            setUser(user)
        }
        catch (error) {
            console.log(error);
            Alert.alert(error.message)
        }
    }

    return (
        <View>
            <Text >Login</Text>
            <TextInput placeholder="Entrez votre email" keyboardType="email-address"  value={login} onChangeText={setLogin} />
            <TextInput placeholder="Entrez votre mot de passe" secureTextEntry={true}  value={pass} onChangeText={setPass} />
            <TouchableOpacity onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
