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

const reducer = (state, action) => {
    Object.freeze(state)
    let currentState = Object.assign({}, state)
    switch (action.type) {
        case 'makeStroke':
            currentState.score[state.hole] += 1
            return { ...state, score: currentState.score }
        case 'endHole':
            currentState.score[state.hole] += 1
            currentState.score[state.hole + 1] = 0
            currentState.shots[state.hole + 1] = []
            return { ...state, score: currentState.score , hole: state.hole + 1 }
        case 'finishGame':
            return { ...state, complete: state.complete }
        case 'recordShot':
            currentState.shots[state.hole].push(action.payload)
            return { ...state, shots: currentState.shots }
        default:
            return state
    }
}
    
const CasualScreen = (props) => {
    let prevGameId = false
    let prevScore = { '1': 0 }
    let prevShots = {'1': []}
    let prevHole = 1

    // const updateToLastGame = (game) => {
    //     prevGameId = game.id
    //     prevScore = game.score
    //     prevShots = game.shots
    //     prevHole = Object.values(game.score).length
    // }

    // if (props.navigation.state.params.previousGame) {
    //     updateToLastGame(props.navigation.state.params.previousGame)
    // }


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
                dispatch({ type: 'recordShot', payload: pos })
            }
        );
        dispatch({ type: 'makeStroke' })        
    }
    

    return (
        <View>
            <Button
                title='in'
                onPress={() => { 
                    dispatch({ type: 'endHole' })
                }}
            />
            <Button
                title='stroke'
                onPress={() => { 
                    makeStroke()
                }}
            />
            {/* <Button
                title='save'
                onPress={() => { 
                    recordResults(score, shots, complete, gameId, setGameId)
                }}
            /> */}
            <Button
                title='finish'
                onPress={() => { 
                    dispatch({ type: 'finishGame' })
                }}
            />
            <Map shots={state.shots}/>
            <FlatList
                keyExtractor={score => score.toString()}
                data={Object.entries(state.score)}
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


