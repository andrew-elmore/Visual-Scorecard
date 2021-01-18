import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions, ImageBackground } from 'react-native';
import { createGame, getIncompleteGame, fetchGameDetails } from './../api/scores'
import Spacer from './../component/spacer'
import styleSettings from './../styleSettings'



const HomeScreen = (props) => {


    return (
        <ImageBackground source={require('./../../assets/course.png')} style={styleSettings.background}>    

            <Spacer/>
            <Text style={styleSettings.heading}>Visual Scorecard</Text>
            <Spacer/>
            <View style={styles.shadowButtonContainer}>
            <Button
                color='rgb(255, 255, 255)'
                title='Casual Game'
                onPress={async() => { 
                    const gameId = await getIncompleteGame()
                    if (gameId){
                        const game = await fetchGameDetails(gameId)
                        props.navigation.navigate('CasualScreen', { gameId: gameId, game: game})
                    } else {
                        const newGameId = await createGame(false)
                        props.navigation.navigate('New', { gameId: newGameId })
                    }
                }}
            />
            </View>
            <Spacer/>
            <View style={styles.shadowButtonContainer}>
            <Button
                color='rgb(255, 255, 255)'
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
            </View>
            <Spacer />
        </ImageBackground>
    )
}

const styles = StyleSheet.create(styleSettings)

export default HomeScreen;