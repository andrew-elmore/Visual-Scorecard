import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { recordResults, fetchResults} from '../api/airtable'
import Map from './../component/map'

const recordScore = (score, hole, setScore) => {
    Object.freeze(score)
    let newScore = Object.assign({}, score)
    if(newScore[hole]){
        newScore[hole] +=1
    } else {
        newScore[hole] = 1
    }
    setScore (newScore)
}

const recordShots = (shots, setShots, hole, pos) => {
    Object.freeze(shots)
    let newShots = Object.assign({}, shots)
    if (!newShots[hole]) {
        newShots[hole] = []
    }
    newShots[hole].push(pos)
    setShots(newShots)
}

// const makeStroke = (score, hole, setScore, shots, setShots, complete, gameId, setGameId) => {
//     navigator.geolocation.getCurrentPosition(
//         pos => {
//             recordShots(shots, setShots, hole, pos)
//         }
//     );
//     recordScore(score, hole, setScore)
//     recordResults(score, shots, complete, gameId, setGameId)
// }

// const endHole = (score, hole, setHole, setScore, shots, setShots, complete, gameId, setGameId) =>{
//     makeStroke(score, hole, setScore, shots, setShots)
//     setHole(hole + 1)
//     recordResults(score, shots, complete, gameId, setGameId)
// }
    
const CasualScreen = (props) => {
    let prevGameId = false
    let prevScore = { '1': 0 }
    let prevShots = {}
    let prevHole = 1

    const updateToLastGame = (game) => {
        prevGameId = game.id
        prevScore = game.score
        prevShots = game.shots
        prevHole = Object.values(game.score).length
    }

    if (props.navigation.state.params.previousGame) {
        updateToLastGame(props.navigation.state.params.previousGame)
    }


    const [state, dispatch] = useReducer(reducer, { 
        gameId: prevGameId, 
        score: prevScore, 
        shots: prevShots, 
        hole: prevHole, 
        complete: false 
    })

    const endHole = () => {
        makeStroke(score, hole, setScore, shots, setShots)
        setHole(hole + 1)
    }
    
    const makeStroke = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                recordShots(shots, setShots, hole, pos)
            }
        );
        recordScore(score, hole, setScore)
        console.log(score)
    }
    

    let scores = Object.entries(score)
    return (
        <View>
            <Button
                title='in'
                onPress={() => { 
                    dispatch({ type: 'endHole' })
                    recordResults(score, shots, complete, gameId, setGameId)
                }}
            />
            <Button
                title='stroke'
                onPress={() => { 
                    makeStroke()
                    recordResults(score, shots, complete, gameId, setGameId)
                }}
            />
            <Button
                title='save'
                onPress={() => { 
                    recordResults(score, shots, complete, gameId, setGameId)
                }}
            />
            <Button
                title='finish'
                onPress={() => { 
                    setComplete(true)
                    recordResults(score, shots, complete, gameId, setGameId)
                }}
            />
            <Map shots={state.shots}/>
            <FlatList
                keyExtractor={score => score.toString()}
                data={state.scores}
                renderItem={({ item, index }) => {
                    return (<Text>{`${item[0]}:  ${item[1]}`}</Text>)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CasualScreen;


