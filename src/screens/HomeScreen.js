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


// const newGame = {
//     gameId: false,
//     score: { '1': 0 },
//     shots: { '1': [] },
//     hole: 1
// }

const HomeScreen = (props) => {

    // setPos()
    // updatePreviousGame()

    const [results, setResults] = useState([])
    const [previousGame, setPreviousGame] = useState('')
 

    return (
        <View>
            {/* <Button
                title='Casual Mode'
                onPress={() => {
                    updatePreviousGame()
                    let previousGame = getPreviousGame()
                    if (previousGame) {
                        console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
                        console.log(previousGame)
                        props.navigation.navigate('CasualScreen', { previousGame: previousGame, currentPos: currentPos })
                    } else {
                        createNewGame(newGame, setNewGameId)
                        props.navigation.navigate('NewGameScreen')

                    }
                }}
            /> */}
            <Button
                title='test Axios get'
                onPress={() => { 
                    getIncompleteGame(previousGame, setPreviousGame)
                }}
            />
            <Button
                title='test Axios get navigate'
                onPress={async() => { 
                    const result = await getIncompleteGame()
                    console.log('home button: ', result)
                    props.navigation.navigate('ResultsScreen', { previousGame: result})
                }}
            />
            <Button
                title='test Axios post'
                onPress={() => { createGame(results, setResults) }}
            />
            <FlatList
                keyExtractor={result => result}
                data={results}
                renderItem={({ item, index }) => {
                    return <Text>{item}</Text>
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;