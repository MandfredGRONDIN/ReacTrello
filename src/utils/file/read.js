import { Alert } from 'react-native'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

export async function downloadFileToDevice(task) {
    try {
        const storage = getStorage()
        const fileRef = ref(storage, task.filePath)
        const downloadURL = await getDownloadURL(fileRef)

        const fileName = task.filePath.split('/').pop()

        const newFileName = `downloaded_${fileName}`

        const downloadResult = await FileSystem.downloadAsync(
            downloadURL,
            FileSystem.documentDirectory + newFileName,
        )

        if (downloadResult.status !== 200) {
            throw new Error('Failed to download file')
        }

        const fileInfo = await FileSystem.getInfoAsync(
            FileSystem.documentDirectory + newFileName,
        )

        if (fileInfo.exists) {
            await Sharing.shareAsync(FileSystem.documentDirectory + newFileName)
            Alert.alert('Succès', 'Le fichier a été téléchargé avec succès.')
        } else {
            throw new Error('Failed to find downloaded file')
        }
    } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error)
        Alert.alert(
            'Erreur',
            'Une erreur est survenue lors du téléchargement du fichier.',
        )
    }
}

export async function downloadUrl(filePath) {
    try {
        const storage = getStorage()
        const fileRef = ref(storage, filePath)
        const downloadURL = await getDownloadURL(fileRef)
        return downloadURL
    } catch (error) {
        console.error(
            "Erreur lors de la récupération de l'URL de téléchargement :",
            error,
        )
        throw error
    }
}
