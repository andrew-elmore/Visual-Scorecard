import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import { createGame, getIncompleteGame, fetchGameDetails } from './../api/scores'
import { Context as GameContext } from './../context/gameContext'
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
    const { state, makeNewGame } = useContext(GameContext)

    return (
        <View >
            <Spacer/>
            <Button
                title='Casual Game'
                onPress={async() => { 
                    if (state.gameId){
                        const game = await fetchGameDetails(gameId)
                        props.navigation.navigate('CasualScreen', { gameId: gameId, game: game})
                    } else {
                        makeNewGame(false)
                        props.navigation.navigate('NewGameScreen')
                    }
                }}
            />
            <Button
                title='Strict Game'
                onPress={async() => { 
                    if (state.gameId){
                        const game = await fetchGameDetails(gameId)
                        props.navigation.navigate('StrictScreen', { gameId: gameId, game: game})
                    } else {
                        makeNewGame(true)
                        props.navigation.navigate('NewGameScreen')
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