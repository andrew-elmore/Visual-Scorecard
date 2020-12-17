import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import { createGame, getIncompleteGame, fetchGameDetails } from './../api/scores'
import Spacer from './../component/spacer'
import styleSettings from './../styleSettings'

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
            <Spacer/>
            <Button
                title='Casual Game'
                onPress={async() => { 
                    const gameId = await getIncompleteGame()
                    if (gameId){
                        const game = await fetchGameDetails(gameId)
                        props.navigation.navigate('CasualScreen', { gameId: gameId, game: game})
                    } else {
                        const newGameId = await createGame(false)
                        props.navigation.navigate('NewGameScreen', { gameId: newGameId })
                    }
                }}
            />
            <Button
                title='Strict Game'
                onPress={async() => { 
                    const gameId = await getIncompleteGame()
                    if (gameId){
                        const game = await fetchGameDetails(gameId)
                        props.navigation.navigate('StrictScreen', { gameId: gameId, game: game})
                    } else {
                        const newGameId = await createGame(true)
                        props.navigation.navigate('NewGameScreen', { gameId: newGameId })
                    }
                }}
            />
            <Button
                title='Review All Games'
                onPress={() => { 
                    props.navigation.navigate('NineteenthHole')
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create(styleSettings)

export default HomeScreen;