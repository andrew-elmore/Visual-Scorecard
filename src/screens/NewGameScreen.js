import React, { useState, useReducer } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, TextInput, Dimensions } from 'react-native';
import { updateGameDetails, fetchGameDetails } from './../api/scores'


const reducer = (state, action) => {
    Object.freeze(state)
    let currentState = Object.assign({}, state)
    switch (action.type) {
        case 'par': // updatesPar
            currentState.par[action.payload.hole] = action.payload.newPar
            return { ...state, par: currentState.par }
        case 'yards': // updatesYards
            currentState.yards[action.payload.hole] = action.payload.newYards
            return { ...state, yards: currentState.yards }
        case 'setDefault':
            return ({
                par: { '1': 4, '2': 4, '3': 4, '4': 4, '5': 4, '6': 4, '7': 4, '8': 4, '9': 4,},
                yards: { '1': 400, '2': 400, '3': 400, '4': 400, '5': 400, '6': 400, '7': 400, '8': 400, '9': 400,}
            })
        default:
            return state
    }
}

const NewGameScreen = (props) => {
    const gameId = props.navigation.state.params.gameId
    const pos = props.navigation.state.params.gameId
    const [course, setCourse] = useState('test')
    const [state, dispatch] = useReducer(reducer, {
        par: {},
        yards: {}
    })
    // const [state, dispatch] = useReducer(reducer, {
    //     par: {
    //         '1': 4,
    //         '2': 4,
    //         '3': 4,
    //         '4': 4,
    //         '5': 4,
    //         '6': 4,
    //         '7': 4,
    //         '8': 4,
    //         '9': 4,
    //     },
    //     yards: {
    //         '1': 400,
    //         '2': 400,
    //         '3': 400,
    //         '4': 400,
    //         '5': 400,
    //         '6': 400,
    //         '7': 400,
    //         '8': 400,
    //         '9': 400,}
    // })

    const holes = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    // if(!state.par[1]){
    //     dispatch({type: 'setDefault'})
    // }
    return (
        <View style={styles.background}>
            <TextInput
                style={styles.courseInput}
                autoCapitalize='words'
                autoCorrect={false}
                value={course}
                onChangeText={(newValue) => { setCourse(newValue) }}
            />
            <View style={{ backgroundColor: 'rgb(54, 125, 0)', borderRadius: 10, margin: 10}}>
            <Button
                color='rgb(255, 255, 255)'
                title='Create New Game'
                onPress={async () => {
                    const game = await fetchGameDetails(gameId)
                    game.fields.course = course
                    game.fields.holes = state
                    updateGameDetails(game)
                    props.navigation.navigate('CasualScreen', { gameId: game.id, game: game, pos: pos })
                }}
            />
            </View>

            <FlatList 
                keyExtractor={hole => {
                    return hole.toString()
                }}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                renderItem={({ item, index }) => {
                    let hole = item 
                    console.log(hole)
                    return(
                        <View style={styles.contents}>
                            <Text style={styles.lines}>Hole: {hole}</Text>
                            <Text>Par:  </Text>
                            <TextInput
                                numericvalue
                                keyboardType={'numeric'}
                                style={styles.textInput}
                                placeholder='par'
                                autoCapitalize='words'
                                autoCorrect={false}
                                value={state.par[hole]}
                                onChangeText={(newValue) => {
                                    dispatch({ type: 'par', payload: { hole: hole, newPar: newValue } })
                                }}
                                
                            />

                            <Text>Yards: </Text>
                            <TextInput
                                style={styles.lines}
                                numericvalue
                                keyboardType={'numeric'}
                                style={styles.textInput}
                                placeholder='yards'
                                autoCapitalize='words'
                                autoCorrect={false}
                                value={state.yards[hole]}
                                onChangeText={(newValue) => {
                                    dispatch({ type: 'yards', payload: { hole: hole, newYards: newValue } })
                                }}
                            />
                        </View>
                    )
                }}
                contentContainerStyle={{ paddingBottom: 200 }}
            />
            
            
        </View>
    )
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgb(190, 247, 124)',
        height: Dimensions.get("window").height,
        paddingTop: 10
    },
    contents: {
        flex: 1, 
        flexDirection: 'row',
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1
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

export default NewGameScreen;


// {
//     holes.map((hole) => {
//         return (
//             <View key={hole}>
//                 <Text>{hole}</Text>
//                 {/* <Text>Par:  </Text> */}
//                 <TextInput
//                     numericvalue
//                     keyboardType={'numeric'}
//                     style={styles.textInput}
//                     placeholder='par'
//                     autoCapitalize='words'
//                     autoCorrect={false}
//                     value={state.par[hole]}
//                     onChangeText={(newValue) => {
//                         dispatch({ type: 'par', payload: { hole: hole, newPar: newValue } })
//                     }}
//                 />

//                 {/* <Text>Yards: </Text> */}
//                 <TextInput
//                     style={styles.textInput}
//                     numericvalue
//                     keyboardType={'numeric'}
//                     placeholder='yards'
//                     autoCapitalize='words'
//                     autoCorrect={false}
//                     value={state.yards[hole]}
//                     onChangeText={(newValue) => {
//                         dispatch({ type: 'yards', payload: { hole: hole, newYards: newValue } })
//                     }}
//                 />

//             </View>
//         )
//     })
// }