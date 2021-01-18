import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions, ImageBackground } from 'react-native';
import { getCourses } from '../api/courses'
import { updateGameDetails, fetchGameDetails } from '../api/scores'
import styleSettings from './../styleSettings'
import Spacer from './../component/spacer'



const NewGameScreen = (props) => {
    const [courses, setCourses] = useState([])
    const findCourses = async() =>{
        const res = await getCourses()
        setCourses(res)
    }
    if (courses.length === 0){
        findCourses()
    }
    const gameId = props.navigation.state.params.gameId
    return (
        <ImageBackground source={require('./../../assets/course.png')} style={styleSettings.background}> 
            <View style={styles.shadowButtonContainer}>
                <Button
                    color='rgb(255, 255, 255)'
                    title='Create New Course'
                    onPress={async () => {
                        props.navigation.navigate('Course', { gameId: gameId})
                    }}
                />
            </View>
            <Spacer />
            <FlatList
                keyExtractor={item => {
                    return item.name.toString()
                }}
                data={courses}
                renderItem={({ item, index }) => {
                    let course = item
                    return (
                    <View>
                            <View style={styles.shadowButtonContainer}>
                        <Button
                            color='rgb(255, 255, 255)'
                            title={course.name}
                            onPress={async () => {
                                const game = await fetchGameDetails(gameId)
                                game.fields.course = course.name
                                game.fields.holes = course.holes
                                await updateGameDetails(game)
                                if (game.fields.strict) {
                                    props.navigation.navigate('StrictScreen', { gameId: game.id, game: game })
                                } else {
                                    props.navigation.navigate('CasualScreen', { gameId: game.id, game: game })
                                }
                            }}
                        />
                        </View>
                        <Spacer />
                    </View>
                    )
                }}
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create(styleSettings)

export default NewGameScreen;