import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { createNewGame} from './../api/airtable'
import { updatePreviousGame, getPreviousGame} from './../game/prevGame'
import { setNewGameId} from './../game/newGame'
import axiosAirtable from './../api/gameReq'


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
                onPress={async() => {
                    const res = await axiosAirtable.get('?')
                    console.log(res.data)
                }}
            />
            <Button
                title='test Axios post'
                onPress={async() => {
                    const res = await axiosAirtable.post('',{
                        "records": [
                            {
                                "fields": {
                                    "date": "1607395386032",
                                    "score": "{\"1\":0}",
                                    "shots": "{\"1\":[]}"
                                }
                            }
                        ]
                    })
                    console.log(res.data.records[0].id)
                    setResults([...results, res.data.records[0].id])
                    // console.log(res.data.records[0].id)
                }}
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