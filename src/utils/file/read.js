import { Alert } from 'react-native'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import * as FileSystem from 'expo-file-system'

export async function downloadFileToDevice(task) {
    try {
        const storage = getStorage()
        const fileRef = ref(storage, task.filePath)
        const downloadURL = await getDownloadURL(fileRef)

        const fileInfo = await FileSystem.getInfoAsync(
            FileSystem.documentDirectory + 'downloadedFile.ext',
        )

        if (!fileInfo.exists) {
            const downloadResult = await FileSystem.downloadAsync(
                downloadURL,
                FileSystem.documentDirectory + 'downloadedFile.ext',
            )
            if (downloadResult.status !== 200) {
                throw new Error('Failed to download file')
            }
        }

        Alert.alert('Succès', 'Le fichier a été téléchargé avec succès.')
    } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error)
        Alert.alert(
            'Erreur',
            'Une erreur est survenue lors du téléchargement du fichier.',
        )
    }
}
