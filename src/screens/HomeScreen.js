import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { createNewGame} from './../api/airtable'
import { updatePreviousGame, getPreviousGame} from './../game/prevGame'
import { setNewGameId} from './../game/newGame'
import axiosAirtable from '../api/airtableApi'
import { createGame, getIncompleteGame } from './../api/scores'


// let currentPos = null

// const setPos = () => {
//     navigator.geolocation.getCurrentPosition(
//         pos => {
//             currentPos = pos
//         }
//     );
// }



const HomeScreen = (props) => {

    return (
        <View>
            <Button
                title='Casual Game'
                onPress={async() => { 
                    const result = await getIncompleteGame()
                    if (result){
                        console.log('home button suceed: ', result)
                        props.navigation.navigate('ResultsScreen', { gameId: result})
                    } else {
                        const newGame = await createGame()
                        console.log('home button suceed: ', newGame)
                        props.navigation.navigate('NewGameScreen', { gameId: newGame})
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;