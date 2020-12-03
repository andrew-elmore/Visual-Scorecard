import React, { useReducer, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
// import {airtable} from '../api/airtable'
import Map from './../component/map'

var Airtable = require('airtable');
export const base = new Airtable({ apiKey: 'keyHyLPdaCbr7AoxH' }).base('appcMdRfjvZEs0zeX');

const recordResults = (score, shots) => {
    console.log(Date.now())
    console.log(score)
    base('scores').create([
        {
            "fields": {
                "date": JSON.stringify(Date.now()),
                "score": JSON.stringify(score),
                "shots": JSON.stringify(shots)
            }
        },
    ], function (err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
    });
}

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
    // recordResults(score)
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
            <Button
                title='save'
                onPress={() => { 
                    recordResults(score, shots)
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