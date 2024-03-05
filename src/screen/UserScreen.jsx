// src/screen/UserScreen

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/userContext';
import { styles } from '../styles/styles';

const User = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(undefined);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Votre profil</Text>
            <Text style={styles.email}>{user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}

export default User;
