import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { createNewGame} from './../api/airtable'
import { updatePreviousGame, getPreviousGame} from './../game/prevGame'
import { setNewGameId} from './../game/newGame'

const getLoc = () => {
    navigator.geolocation.getCurrentPosition(
        pos => {
        }
    );
}


const newGame = {
    gameId: false,
    score: { '1': 0 },
    shots: { '1': [] },
    hole: 1
}

const HomeScreen = (props) => {

    updatePreviousGame()
 
    let pg = getPreviousGame()

    return (
        <View>
            <Button
                title='Casual Mode'
                onPress={() => {
                    updatePreviousGame()
                    let previousGame = getPreviousGame()
                    if (previousGame) {
                        props.navigation.navigate('CasualScreen', {previousGame: previousGame})
                    } else {
                        createNewGame(newGame, setNewGameId)
                        props.navigation.navigate('NewGameScreen')

                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;