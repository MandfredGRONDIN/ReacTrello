import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { styles } from '../styles/styles'

const BoardScreenStatus = ({ statuses, tasks, renderTaskItem }) => {
    return (
        <FlatList
            data={statuses}
            renderItem={({ item }) => (
                <View key={item.id}>
                    <Text style={styles.projectTitle}>{item.title}</Text>
                    <FlatList
                        data={tasks.filter(
                            (task) => task.statusIndex === item.id,
                        )}
                        renderItem={renderTaskItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
        />
    )
}

export default BoardScreenStatus
