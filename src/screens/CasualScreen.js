import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { recordResults, fetchResults} from '../api/airtable'
import Map from './../component/map'



const reducer = (state, action) => {
    Object.freeze(state)
    let currentState = Object.assign({}, state)
    switch (action.type) {
        case 'makeStroke': // carries stroke actions
            currentState.score[state.hole] += 1
            return { ...state, score: currentState.score }
        case 'endHole': // does not update score or record a shot
            currentState.score[state.hole + 1] = 0
            currentState.shots[state.hole + 1] = []
            return { ...state, score: currentState.score, shots: currentState.shots , hole: state.hole + 1 }
        case 'finishGame':
            return { ...state, complete: state.complete }
        case 'recordShot': // records a shot and updates the database
            currentState.shots[state.hole].push(action.payload)
            gameId = recordResults(currentState)
            console.log('casualScreen:23')
            console.log(gameId)
            if (gameId) {
                currentState.gameId = gameId
            }
            return { ...state, shots: currentState.shots, gameId: currentState.gameId }
        case 'seeState':
            console.log(state)
        default:
            return state
    }
}
    
const CasualScreen = (props) => {
    let previousGame = props.navigation.state.params.previousGame

    

    const [state, dispatch] = useReducer(reducer, { 
        gameId: previousGame.gameId, 
        score: previousGame.score, 
        shots: previousGame.shots, 
        hole: previousGame.hole, 
        complete: false 
    })

    
    const makeStroke = () => {
        dispatch({ type: 'makeStroke' })
        navigator.geolocation.getCurrentPosition(
            pos => {
                dispatch({ type: 'recordShot', payload: {pos: pos, gameId: gameId, setGameId: setGameId} })
            }
        );
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
            <Button
                title='seeState'
                onPress={() => { 
                    dispatch({ type: 'seeState' })
                }}
            />
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


