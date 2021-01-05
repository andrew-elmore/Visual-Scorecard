import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import { updateGameDetails, fetchGameDetails } from './../api/scores'
import Map from './../component/map'
import Scorecard from './../component/scorecard'
import styleSettings from './../styleSettings'



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
            return { ...state, score: currentState.score, shots: currentState.shots, hole: state.hole + 1 }
        case 'finishGame':
            currentState.complete = true
            updateGameDetails({ id: action.payload.gameId, fields: currentState })
            return { ...state, complete: true }
        case 'recordShot': // records a shot and updates the database
            currentState.shots[state.hole].push(action.payload.pos)
            updateGameDetails({ id: action.payload.gameId, fields: currentState })
            return { ...state, shots: currentState.shots }
        case 'penalty': // adds one shot to the score
            currentState.score[state.hole] += 1
            return { ...state, score: currentState.score }
        case 'seeState':
        default:
            return state
    }
}

const getLocation = (updateLocation) => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            updateLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            })
        }
    );
}

const renderGameDetails = (game, state, location, gameId, props) => {
    if (state.course != 'placeholder') {
        return (
            <View>
                <Map shots={state.shots} location={location} />
                <Scorecard game={game} gameScore={state} />
            </View>
        )
    } else {
        props.navigation.navigate('New', { gameId: gameId })
        return (<Text>Please Wait For Game To Load</Text>)
    }
}



const StrictScreen = (props) => {


    const [location, updateLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    })

    if (location.latitude === 0) {
        getLocation(updateLocation)
    }

    const pos = props.navigation.state.params.gameId
    let game = props.navigation.state.params.game.fields
    const [gameId, updateGameId] = useState(props.navigation.state.params.gameId)
    const [state, dispatch] = useReducer(reducer, {
        course: game.course,
        score: game.score,
        shots: game.shots,
        hole: Object.keys(game.score).length,
        complete: false
    })





    const makeStroke = () => {
        dispatch({ type: 'makeStroke', payload: { gameId: gameId } })
        navigator.geolocation.getCurrentPosition(
            pos => {
                dispatch({ type: 'recordShot', payload: { pos: pos, gameId: gameId } })
            }
        );
    }




    return (
        <View style={styles.background}>
            <Text style={{ fontSize: 15, textAlign: "center" }}>{`You are playing at ${state.course}`}</Text>
            <View >
                <View style={styles.buttonContainer}>
                    <Button
                        color='rgb(255, 255, 255)'
                        title='Stroke'
                        onPress={() => {
                            makeStroke()
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        color='rgb(255, 255, 255)'
                        title='In'
                        onPress={() => {
                            if (state.hole === 9) {
                                dispatch({ type: 'finishGame', payload: { gameId: gameId } })
                                props.navigation.navigate('Review', { lastGame: state })
                            } else {
                                dispatch({ type: 'endHole', payload: { gameId: gameId } })
                            }
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        color='rgb(255, 255, 255)'
                        title='Penalty'
                        onPress={() => {
                            dispatch({type: 'penalty', payload: {gameId}})
                        }}
                    />
                </View>
            </View>

            {renderGameDetails(game, state, location, gameId, props)}
        </View>
    )
}

const styles = StyleSheet.create(styleSettings)

export default StrictScreen;



