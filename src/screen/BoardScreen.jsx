import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Animated,
    SafeAreaView,
    Platform,
} from 'react-native'
import { UserContext } from '../context/userContext'
import { styles } from '../styles/styles'
import { getTasksByProjectId } from '../utils/task/read'
import { getStatus } from '../utils/status/read'
import { deleteTask } from '../utils/task/delete'
import { updateProject } from '../utils/project/update'
import BoardScreenHeader from '../components/BoardScreenHeader'
import BoardScreenStatus from '../components/BoardScreenStatus'

const BoardScreen = ({ navigation }) => {
    const { project, setProject } = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [statuses, setStatuses] = useState([])
    const [newDescription, setNewDescription] = useState('')
    const [showInputs, setShowInputs] = useState(false)
    const animatedValues = useRef([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchTasks()
        })

        return unsubscribe
    }, [navigation])

    useEffect(() => {
        if (project) {
            setNewTitle(project.title)
            setNewDescription(project.description)
            fetchTasks()
            animatedValues.current = Array.from(
                { length: tasks.length },
                () => new Animated.Value(500),
            )
        }
    }, [project])

    useEffect(() => {
        if (tasks.length > 0) {
            animatedValues.current = Array.from(
                { length: tasks.length },
                () => new Animated.Value(500),
            )
        }
    }, [tasks])

    const fetchTasks = async () => {
        try {
            const tasksData = await getTasksByProjectId(project.id)
            setTasks(tasksData)
            const statusesData = await getStatus(project.id)
            setStatuses(statusesData)
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error)
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(project.id, taskId)
            setTasks(tasks.filter((task) => task.id !== taskId))
        } catch (error) {
            console.error('Error deleting task:', error)
            Alert.alert('Error', 'Failed to delete task.')
        }
    }

    const handleTaskSelection = (taskId) => {
        navigation.navigate('TaskId', { taskId })
    }

    const handleUpdateProject = async () => {
        try {
            await updateProject(project.id, {
                title: newTitle,
                description: newDescription,
            })
            setProject({
                ...project,
                title: newTitle,
                description: newDescription,
            })
            Alert.alert('Succès', 'Projet mis à jour avec succès.')
        } catch (error) {
            console.error('Erreur lors de la mise à jour du projet :', error)
            Alert.alert(
                'Erreur',
                'Impossible de mettre à jour le projet. Veuillez réessayer plus tard.',
            )
        }
    }

    useEffect(() => {
        tasks.forEach((task, index) => {
            const animatedValue = animatedValues.current[index]
            const animationDelay = 500 * index

            const timeoutId = setTimeout(() => {
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start()
            }, animationDelay)

            return () => clearTimeout(timeoutId)
        })
    }, [tasks])

    const renderTaskItem = ({ item, index }) => {
        const animatedValue = animatedValues.current[index]

        return (
            <Animated.View
                style={{ transform: [{ translateX: animatedValue }] }}
            >
                <TouchableOpacity
                    style={styles.taskItem}
                    onPress={() => handleTaskSelection(item.id)}
                >
                    <View style={styles.taskItemContainer}>
                        <View>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text style={styles.taskDescription}>
                                {item.description}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleDeleteTask(item.id)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteButtonText}>
                                Supprimer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    return (
        <SafeAreaView
            style={[
                styles.container,
                { marginTop: Platform.OS === 'ios' ? 44 : 0 },
            ]}
        >
            <BoardScreenHeader
                project={project}
                setProject={setProject}
                showInputs={showInputs}
                setShowInputs={setShowInputs}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newDescription={newDescription}
                setNewDescription={setNewDescription}
                handleUpdateProject={handleUpdateProject}
                handleProjectModification={() =>
                    navigation.navigate('ProjectModification', { project })
                }
            />
            <Text style={styles.taskTitle}>Tâches :</Text>
            <BoardScreenStatus
                statuses={statuses}
                tasks={tasks}
                renderTaskItem={renderTaskItem}
            />
        </SafeAreaView>
    )
}

export default BoardScreen
