import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { recordResults} from '../api/airtable'
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
            currentState.complete = true
            recordResults(currentState)
            return { ...state, complete: true }
        case 'recordShot': // records a shot and updates the database
            currentState.shots[state.hole].push(action.payload.pos)
            recordResults(currentState)
            return { ...state, shots: currentState.shots}
        case 'seeState':
        default:
            return state
    }
}


    
const CasualScreen = (props) => {
    let previousGame = props.navigation.state.params.previousGame


    let currentPos = {
        latitude: props.navigation.state.params.currentPos.coords.latitude,
        longitude: props.navigation.state.params.currentPos.coords.longitude
    }

    const [state, dispatch] = useReducer(reducer, { 
        course: previousGame.course,
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
                dispatch({ type: 'recordShot', payload: {pos: pos} })
            }
        );
    }
    

    return (
        <View>
            <Text>{`You are playing at ${state.course}`}</Text>
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
                    props.navigation.navigate('NineteenthHole', { lastGame: state, currentPos: currentPos})
                }}
            />
            <Map shots={state.shots} currentPos={currentPos}/>
            <FlatList
                keyExtractor={score => {
                    return score[0].toString()
                }}
                data={Object.entries(state.score)}
                renderItem={({ item, index }) => {
                    return (<Text>{`${item[0]}:  ${item[1]}`}</Text>)
                }}
            />
            <Text>Total Score: {
                Object.values(state.score).reduce((a, b) => {
                    return a + b
                })
            }</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CasualScreen;


