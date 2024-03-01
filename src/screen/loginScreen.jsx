// ReacNativeTrello/src/screen/login.jsx

import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { connectUser } from '../api/auth';
import { UserContext } from '../context/userContext';

const loginScreen = () => {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const { setUser } = useContext(UserContext)

    const handleLogin = async () => {
        try {
            const user = await connectUser(login, pass)
            setUser(user)
        }
        catch (error) {
            console.log(error);
            Alert.alert(error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Login</Text>
            <TextInput placeholder="Entrez votre email" keyboardType="email-address" style={styles.input} value={login} onChangeText={setLogin} />
            <TextInput placeholder="Entrez votre mot de passe" secureTextEntry={true} style={styles.input} value={pass} onChangeText={setPass} />
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default loginScreen;

