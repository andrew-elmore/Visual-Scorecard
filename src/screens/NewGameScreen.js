import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import { fetchNewGameId } from './../game/newGame'

const NewGameScreen = (props) => {

    let currentPos = null

    const setPos = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                currentPos = pos
            }
        );
    }

    setPos()

    const [course, setCourse] = useState('test')

    const newGame = {
        gameId: false,
        score: { '1': 0 },
        shots: { '1': [] },
        hole: 1,
        complete: false
    }

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
                title='Casual Mode'
                onPress={() => {
                    if (course != ''){
                        newGame.gameId = fetchNewGameId()
                        props.navigation.navigate('CasualScreen', { previousGame: {...newGame, course: course}, currentPos: currentPos })
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default NewGameScreen;