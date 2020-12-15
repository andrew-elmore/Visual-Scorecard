import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { recordResults} from '../api/airtable'
import { updateGameDetails, fetchGameDetails } from './../api/scores'
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
            updateGameDetails({id: action.payload.gameId, fields: currentState})
            return { ...state, complete: true }
        case 'recordShot': // records a shot and updates the database
            currentState.shots[state.hole].push(action.payload.pos)
            updateGameDetails({ id: action.payload.gameId, fields: currentState })
            return { ...state, shots: currentState.shots}
        case 'seeState':
        default:
            return state
    }
}

const getLocation = (updateLocation) => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            updateLocation( {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            })
        }
    );
}



    
const CasualScreen = (props) => {

    const [location, updateLocation] = useState({})
    if (!location.latitude) {
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
        dispatch({ type: 'makeStroke', payload: {gameId: gameId} })
        navigator.geolocation.getCurrentPosition(
            pos => {
                dispatch({ type: 'recordShot', payload: {pos: pos, gameId: gameId} })
            }
        );
    }

    
    

    return (
        <View>
            <Text>{`You are playing at ${state.course}`}</Text>
            <Button
                title='in'
                onPress={() => { 
                    dispatch({ type: 'endHole', payload: { gameId: gameId } })
                }}
            />
            <Button
                title='stroke'
                onPress={() => { 
                    makeStroke()
                }}
            />
            <Button
                title='finish'
                onPress={() => { 
                    dispatch({ type: 'finishGame', payload: { gameId: gameId } })
                    props.navigation.navigate('NineteenthHole', { lastGame: state})
                }}
            />
            <Map shots={state.shots} location={location}/>
            <FlatList
                keyExtractor={item => {
                    return item[0].toString()
                }}
                data={Object.entries(game.holes.par)}
                renderItem={({ item, index }) => {
                    let hole = item[0]
                    let par = item[1]
                    let yards = game.holes.yards[hole]
                    let score = ''
                    let overUnder = ''
                    if (state.score[hole]){
                        score = state.score[hole]
                        overUnder = parseInt(state.score[hole]) - parseInt(par)
                    } 
                    return (<Text>{`${hole} : ${par} : ${yards} : ${score} : ${overUnder}`}</Text>)
                }}
            />
            <Text>Total Score: {
                Object.values(state.score).reduce((a, b) => {
                    return a + b
                })
            } : {
                Object.values(game.holes.par).reduce((a, b) =>{return a + b})
            }</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CasualScreen;



