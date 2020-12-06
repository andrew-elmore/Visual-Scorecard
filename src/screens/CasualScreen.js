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

const makeStroke = (score, hole, setScore, shots, setShots) => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            recordShots(shots, setShots, hole, pos)
        }
    );
    recordScore(score, hole, setScore)
}

const endHole = (score, hole, setHole, setScore, shots, setShots) =>{
    makeStroke(score, hole, setScore, shots, setShots)
    setHole(hole + 1)
}
    
const CasualScreen = (props) => {
    let previousGame = false

    const setGame = (res) => {
        // console.log(res.length)
        previousGame = (res[0])
        console.log(previousGame)
    }

    fetchResults(setGame)

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

    if (previousGame) {
        updateToLastGame(previousGame)
    }

    const [gameId, setGameId] = useState(prevGameId)
    const [score, setScore] = useState(prevScore)
    const [shots, setShots] = useState(prevShots)
    const [hole, setHole] = useState(prevHole)
    const [complete, setComplete] = useState(false)


    
    

    let scores = Object.entries(score)
    return (
        <View>
            <Button
                title='in'
                onPress={() => { 
                    endHole(score, hole, setHole, setScore, shots, setShots)
                }}
            />
            <Button
                title='stroke'
                onPress={() => { 
                    makeStroke(score, hole, setScore, shots, setShots)
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
                }}
            />
            <Button
                title='Game Id'
                onPress={() => { 
                    console.log(gameId)
                }}
            />
            <Map shots={shots}/>
            <FlatList
                keyExtractor={score => score.toString()}
                data={scores}
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


