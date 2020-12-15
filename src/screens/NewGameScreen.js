import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';

const NewGameScreen = (props) => {
    const gameId = props.navigation.state.params.gameId
    const [courses, setCourses] = useState([])
    return (
        <View>
            <Button
                title='Create New Course'
                onPress={async () => {
                    props.navigation.navigate('NewCourseScreen', { gameId: gameId})
                }}
            />
            <FlatList
                keyExtractor={item => {
                    return item[0].toString()
                }}
                data={courses}
                renderItem={({ item, index }) => {
                    <Text>{item.name}</Text>
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default NewGameScreen;