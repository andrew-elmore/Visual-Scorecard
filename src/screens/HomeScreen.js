import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { createNewGame} from './../api/airtable'
import { updatePreviousGame, getPreviousGame} from './../game/prevGame'

const getLoc = () => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            console.log(pos)
        }
    );
}


const newGame = {
    gameId: false,
    score: { '1': 0 },
    shots: { '1': [] },
    hole: 1
}

const setGameId = (newId) => {
    newGame.gameId = newId
}


const HomeScreen = (props) => {

    updatePreviousGame()

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
                        createNewGame(newGame, setGameId)
                        props.navigation.navigate('CasualScreen', { previousGame: newGame})

                    }
                }}
            />
            {/* <Button
                title='Casual Mode'
                onPress={() => 
                    props.navigation.navigate('CasualScreen', {previousGame: false})
                }
            /> */}
            <Button
                title='List Results'
                onPress={() => 
                    // fetchResults(logRes)
                    console.log(previousGame)
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;