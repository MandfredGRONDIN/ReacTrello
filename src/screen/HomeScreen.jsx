// home.jsx
import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/userContext';
//import { globalStyles } from '../globalStyles/globalStyles';

const Home = () => {
    const { user, setUser } = useContext(UserContext)
    const handleDeco = () => {
        setUser(undefined)
    }
    return (
        <View >
            <Text>{user.email}</Text>
            <TouchableOpacity  onPress={handleDeco}>
                <Text >Deconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}


export default Home;
