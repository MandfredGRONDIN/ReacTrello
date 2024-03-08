import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../styles/styles'
import { logUser } from '../utils/auth/logUser'
import { UserContext } from '../context/userContext'
import { handleSendEmail } from '../utils/email/sendEmail'

const LoginScreen = () => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [emailVerified, setEmailVerified] = useState(true)
    const { setUser } = useContext(UserContext)

    const handleLogin = async () => {
        try {
            const { user, emailVerified: isEmailVerified } = await logUser(
                login.toLowerCase(),
                pass,
            )
            console.log(isEmailVerified)

            if (!isEmailVerified) {
                setEmailVerified(false)
                Alert.alert(
                    'Veuillez vérifier votre adresse e-mail pour vous connecter.',
                )
                return
            }

            setUser(user)
            setEmailVerified(isEmailVerified)
        } catch (error) {
            console.log(error)
            Alert.alert(error.message)
        }
    }

    const handleResendVerificationEmail = async () => {
        const emailSent = await handleSendEmail()
        if (emailSent) {
            Alert.alert("L'e-mail de vérification a été renvoyé avec succès.")
        } else {
            Alert.alert(
                "Une erreur s'est produite lors de l'envoi de l'e-mail de vérification.",
            )
        }
    }

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
            {!emailVerified && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleResendVerificationEmail}
                >
                    <Text style={styles.buttonText}>
                        Renvoyer l'e-mail de vérification
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default LoginScreen
