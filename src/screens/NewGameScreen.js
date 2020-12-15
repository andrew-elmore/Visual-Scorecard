import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { getCourses } from '../api/courses'
import { updateGameDetails, fetchGameDetails } from '../api/scores'



const NewGameScreen = (props) => {
    const [courses, setCourses] = useState([])
    const findCourses = async() =>{
        console.log('triggered')
        const res = await getCourses()
        setCourses(res)
    }
    if (courses.length === 0){
        findCourses()
    }
    const gameId = props.navigation.state.params.gameId
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
                    return item.name.toString()
                }}
                data={courses}
                renderItem={({ item, index }) => {
                    let course = item
                    return (<Button
                        title={course.name}
                        onPress={async () => {
                            const game = await fetchGameDetails(gameId)
                            game.fields.course = course.name
                            game.fields.holes = course.holes
                            console.log(game)
                            updateGameDetails(game)
                            props.navigation.navigate('CasualScreen', { gameId: game.id, game: game })
                        }}
                    />)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default NewGameScreen;