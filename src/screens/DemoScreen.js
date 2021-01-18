import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, FlatList, Dimensions, ImageBackground } from 'react-native';
import { updateGameDetails, fetchGameDetails } from './../api/scores'
import Map from './../component/map'
import Scorecard from './../component/scorecard'
import styleSettings from './../styleSettings'
import Spacer from './../component/spacer'


let shotPos = [[[41.39487202042702, -71.86156742213633],
[41.396606339812486, -71.86170042946775],
[41.39763551758533, -71.8618689397189],
[41.397694404056224, -71.8619177066539],]
    ,
[[41.3994802726344, -71.86078353751391],
[41.40075426861054, -71.85986048162339],
[41.40213088305319, -71.85932157226092],
[41.40218707566584, -71.85917162117775],]
    ,
[[41.40274032893125, -71.85830702752938],
[41.4005667954324, -71.85831593936155],
[41.399378224392784, -71.85816112686985],
[41.399536634056105, -71.85812062574185],]
    ,
[[41.3985314325625, -71.8578730058443],
[41.39955028019689, -71.86002019290403],
[41.39896752101676, -71.86113220700597],
[41.39895479974122, -71.8611133735163],]
    ,
[[41.39871126048107, -71.86202713252206],
[41.397033506286284, -71.86046583503835],
[41.39670267862013, -71.85912207977115],
[41.39626661711642, -71.85839625873973],
[41.396291609585305, -71.85833331231389],]
    ,
[[41.39503972351111, -71.85902682016938],
[41.39413094271133, -71.8605453879748],
[41.39416740301319, -71.86054585274728],]
    ,
[[41.39378929240278, -71.8598814855774],
[41.3928370130683, -71.85776367255946],
[41.39193665456267, -71.85682738143375],
[41.3913998053047, -71.85630956930375],
[41.39132598943634, -71.85629074741526],]
    ,
[[41.39114661988992, -71.8568324002622],
[41.39138165560554, -71.85776542090798],
[41.39140306563193, -71.85791321942133],]
    ,
[[41.391832170251725, -71.85820774715386],
[41.39286682161721, -71.85923598561914],
[41.393620256568205, -71.86054063321569],
[41.39366394779001, -71.86046879200082],]]


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

const confirmEndHole = (state, dispatch, props, gameId) => {
    Alert.alert(
        'End Hole?',
        'Would you like to end this hole?',
        [
            {
                text: 'yes', onPress: () => {
                    if (state.hole === 9) {
                        dispatch({ type: 'finishGame', payload: { gameId: gameId } })
                        props.navigation.navigate('Review', { lastGame: state })
                    } else {
                        dispatch({ type: 'endHole', payload: { gameId: gameId } })
                    }
                }
            },
            { text: 'no', onPress: () => { }, style: 'cancel' }
        ]
    )

}



const DemoScreen = (props) => {


    const [location, updateLocation] = useState({
        latitude: 41.39625372905789,
        longitude: -71.85932593879278,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015
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

    const getSudoPosistion = (hole) => {
        const idx = state.score[hole] 
        console.log("159 hole: ", hole-1); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("160 idx: ", idx); console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        
        
        
        let latitude = shotPos[hole-1][idx-1][0]
        let longitude = shotPos[hole-1][idx-1][1]
        return ({
            coords: {
                accuracy: 65,
                altitude: 0,
                altitudeAccuracy: 10,
                heading: -1,
                latitude: latitude,
                longitude: longitude,
                speed: -1
            },
            timestamp: Date.now()
        })
    }




    const makeStroke = () => {
        dispatch({ type: 'makeStroke', payload: { gameId: gameId } })
        const pos = getSudoPosistion(state.hole)
        dispatch({ type: 'recordShot', payload: { pos: pos, gameId: gameId } })
    }




    return (
        <ImageBackground source={require('./../../assets/course.png')} style={styleSettings.background}>
            <Spacer />
            <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 5 }}>{`You are playing at ${state.course}`}</Text>
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
                            confirmEndHole(state, dispatch, props, gameId)
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        color='rgb(255, 255, 255)'
                        title='Mulligan'
                        onPress={() => {
                            Alert.alert(
                                'Mulligan Taken',
                                ''
                            )
                        }}
                    />
                </View>
            </View>

            {renderGameDetails(game, state, location, gameId, props)}
        </ImageBackground>
    )
}

const styles = StyleSheet.create(styleSettings)

export default DemoScreen;



