import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, Platform } from 'react-native';
import { UserContext } from '../context/userContext';
import { getTasksByProjectId } from '../utils/task/read';
import { getStatus } from '../utils/status/read';
import { deleteTask } from '../utils/task/delete';
import { updateProject } from '../utils/project/update';
import BoardScreenHeader from '../components/BoardScreenHeader';
import BoardScreenStatus from '../components/BoardScreenStatus';
import TaskItem from '../components/TaskItem';
import { styles } from '../styles/styles';

const BoardScreen = ({ navigation }) => {
    const { project, setProject } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [newDescription, setNewDescription] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (project) {
                fetchTasks();
            }
        });
        return unsubscribe;
    }, [navigation, project]);

    useEffect(() => {
        if (project) {
            setNewTitle(project.title);
            setNewDescription(project.description);
            fetchTasks();
        }
    }, [project]);

    const fetchTasks = async () => {
        try {
            const tasksData = await getTasksByProjectId(project.id);
            setTasks(tasksData);

            const statusesData = await getStatus(project.id);
            setStatuses(statusesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(project.id, taskId);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleTaskSelection = (taskId) => {
        navigation.navigate('TaskId', { taskId });
    };

    const handleUpdateProject = async () => {
        try {
            await updateProject(project.id, {
                title: newTitle,
                description: newDescription,
            });
            setProject({
                ...project,
                title: newTitle,
                description: newDescription,
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du projet :', error);
        }
    };

    const renderTaskItem = ({ item, index }) => {
        return (
            <TaskItem
                item={item}
                index={index}
                handleTaskSelection={handleTaskSelection}
                handleDeleteTask={handleDeleteTask}
            />
        );
    };

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
    );
};

export default BoardScreen;
