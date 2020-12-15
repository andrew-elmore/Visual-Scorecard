import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { createGame, getIncompleteGame, fetchGameDetails } from './../api/scores'




const HomeScreen = (props) => {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    })

    const setPos = (setInitialReigon) => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                setInitialReigon({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        );
    }

    setPos(setInitialRegion)

    return (
        <View>
            <Button
                title='Casual Game'
                onPress={async() => { 
                    const gameId = await getIncompleteGame()
                    // if (gameId){
                    //     const game = await fetchGameDetails(gameId)
                    //     props.navigation.navigate('CasualScreen', { gameId: gameId, game: game, pos: initialRegion})
                    // } else {
                        const newGameId = await createGame()
                        props.navigation.navigate('NewGameScreen', { gameId: newGameId, pos: initialRegion})
                    // }
                }}
            />
            <Button
                title='currentPos'
                onPress={async () => {
                    await setPos(setInitialRegion)
                    console.log(initialRegion)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;