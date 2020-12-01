import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';



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



const CasualScreen = () => {
    const [score, setScore] = useState({'1': 0})
    const [shots, setShots] = useState({})
    const [hole, setHole] = useState(1)
    
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