import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
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
        dispatch({ type: 'makeStroke', payload: {gameId: gameId} })
        navigator.geolocation.getCurrentPosition(
            pos => {
                dispatch({ type: 'recordShot', payload: {pos: pos, gameId: gameId} })
            }
        );
    }

    
    

    return (
        <View style={styles.background}>
            <Text style={{fontSize: 15, textAlign: "center"}}>{`You are playing at ${state.course}`}</Text>
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
                        dispatch({ type: 'endHole', payload: { gameId: gameId } })
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    color='rgb(255, 255, 255)'
                    title='Finish Game'
                    onPress={() => { 
                        dispatch({ type: 'finishGame', payload: { gameId: gameId } })
                        props.navigation.navigate('NineteenthHole', { lastGame: state})
                    }}
                />
            </View>
            </View>
            
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
                    return (<Text style={styles.contents}>{`${hole} : ${par} : ${yards} : ${score} : ${overUnder}`}</Text>)
                }}
            />
            <Text >Total Score: {
                Object.values(game.holes.par).reduce((a, b) => {
                    return parseInt(a) + parseInt(b)
                })
                
            } : {
                Object.values(state.score).reduce((a, b) => {
                    return a + b
                })
            }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgb(190, 247, 124)',
        // height: Dimensions.get("window").height,
        paddingTop: 10
    },
    contents: {
        flex: 1,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        padding: 0,
        borderStyle: 'solid',
        borderWidth: 1
    },
    buttonContainer: {
        backgroundColor: 'rgb(54, 125, 0)',
        borderRadius: 10,
        margin: 1,
     
    },
    lines: {
        marginEnd: 20
    },
    textInput: {
        marginEnd: 20,
        backgroundColor: 'rgb(173, 173, 173)',
        width: 50,
        paddingLeft: 5
    },
    courseInput: {
        width: Dimensions.get("window").width,
        height: 30,
        fontSize: 20,
        backgroundColor: 'rgb(173, 173, 173)',
        paddingLeft: 5
    },
    button: {
        backgroundColor: 'rgb(54, 125, 0)',
        color: 'rgb(54, 125, 0)'
    }
})

export default CasualScreen;



