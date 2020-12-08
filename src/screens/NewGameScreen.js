import React, { useState, useReducer } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import { fetchNewGameId } from '../game/newGame';
import { updateGameDetails, fetchGameDetails } from './../api/scores'

const NewGameScreen = (props) => {
    const gameId = props.navigation.state.params.gameId
    const [course, setCourse] = useState('test')

    return (
        <View>
            <TextInput
                style={styles.textInput}
                autoCapitalize='words'
                autoCorrect={false}
                value={course}
                onChangeText={(newValue) => { setCourse(newValue) }}
            />
            <Text>{`You are playing at ${course}`}</Text>
            <Button
                title='See State'
                onPress={async() => {
                    const game = await fetchGameDetails(gameId)
                    console.log('See gameId: ', game.id)
                }}
            />
            <Button
                title='Create Game B'
                onPress={async() => {
                    const game = await fetchGameDetails(gameId)
                    console.log('See gameId: ', game.id)
                    game.fields.course = course
                    console.log('Create Game B game: ', game)
                    updateGameDetails(game)
                    props.navigation.navigate('ResultsScreen', { gameId: game.id })
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default NewGameScreen;