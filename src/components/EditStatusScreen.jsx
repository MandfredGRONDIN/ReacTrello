import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../styles/styles'
import { getStatusById } from '../utils/status/read'
import { updateStatus } from '../utils/status/update'
import { UserContext } from '../context/userContext'

const EditStatusScreen = ({ route, navigation }) => {
    const { project } = useContext(UserContext)
    const { statusId } = route.params
    const [status, setStatus] = useState(null)
    const [newStatusTitle, setNewStatusTitle] = useState('')

    useEffect(() => {
        fetchStatusDetails()
    }, [])

    const fetchStatusDetails = async () => {
        try {
            const statusData = await getStatusById(project.id, statusId)
            setStatus(statusData)
            setNewStatusTitle(statusData.title)
        } catch (error) {
            console.error('Erreur lors de la récupération du statut :', error)
            Alert.alert('Erreur', 'Échec de la récupération du statut.')
        }
    }

    const handleUpdateStatus = async () => {
        try {
            await updateStatus(project.id, statusId, { title: newStatusTitle })
            Alert.alert('Success', 'Titre du statut mis à jour avec succès.')
            navigation.goBack()
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour du titre du statut :',
                error,
            )
            Alert.alert('Erreur', 'Échec de la mise à jour du titre du statut.')
        }
    }

    return (
        <View style={styles.taskContain}>
            <View>
                {status ? (
                    <View>
                        <Text>Titre du statut actuel: {status.title}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nouveau status"
                            value={newStatusTitle}
                            onChangeText={setNewStatusTitle}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleUpdateStatus}
                        >
                            <Text style={styles.buttonText}>
                                Modifier le statut
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text>Statut non trouvé.</Text>
                )}
            </View>
        </View>
    )
}

export default EditStatusScreen
