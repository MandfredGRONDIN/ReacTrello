// src/components/Member.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const Member = ({ member, onDelete }) => {
    return (
        <View style={styles.memberContainer}>
            <View style={styles.memberContent}>
                <Text style={styles.memberEmail}>{member.email}</Text>
            </View>
        </View>
    );
};

export default Member;
