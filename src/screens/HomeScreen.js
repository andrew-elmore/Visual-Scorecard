import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import { createGame, getIncompleteGame, fetchGameDetails } from './../api/scores'

const logPos = () => {
    navigator.geolocation.getCurrentPosition(
        pos => {
           console.log(pos)
        }
    );
}


const HomeScreen = (props) => {


    return (
        <View >
            <Button
                title='Casual Game'
                onPress={async() => { 
                    const gameId = await getIncompleteGame()
                    if (gameId){
                        const game = await fetchGameDetails(gameId)
                        props.navigation.navigate('CasualScreen', { gameId: gameId, game: game})
                    } else {
                        const newGameId = await createGame()
                        props.navigation.navigate('NewGameScreen', { gameId: newGameId })
                    }
                }}
            />
            <Button
                title='log pos'
                onPress={() => {logPos()}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgb(190, 247, 124)',
        height: Dimensions.get("window").height,
        paddingTop: 10
    },
    contents: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1
    },
    lines: {
        marginEnd: 20
    },
    textInput: {
        marginEnd: 20,
        backgroundColor: 'rgb(173, 173, 173)',
        width: 50,
        paddingLeft: 5
    },
    courseInput: {
        width: Dimensions.get("window").width,
        height: 30,
        fontSize: 20,
        backgroundColor: 'rgb(173, 173, 173)',
        paddingLeft: 5
    },
    button: {
        backgroundColor: 'rgb(54, 125, 0)',
        color: 'rgb(54, 125, 0)'
    }
})

export default HomeScreen;