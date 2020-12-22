import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import { getAllGames, fetchGameDetails } from '../api/scores'
import Map from './../component/map'
import Scorecard from './../component/scorecard'
import * as geolib from 'geolib';
import styleSettings from './../styleSettings'
import Spacer from './../component/spacer'

const fetchGames = async (setGames, setGame, view) =>{
    let searchParam = "filterByFormula={complete}='true'"
    switch (view) {
        case 1:
            searchParam = "filterByFormula=AND({complete}='true', {strict}='false')"
        case 2:
            searchParam = "filterByFormula=AND({complete}='true', {strict}='true')"
        default:
            break;
    }
    const games = await getAllGames(searchParam)
    setGames(games)
    const game = await fetchGameDetails(games[0])
    setGame(game)
}

const findCenter = (shots) => {
    let arrayOfShots = []
    Object.values(shots).forEach((hole) => {
        hole.forEach((shot) => {
            arrayOfShots.push({ longitude: shot.coords.longitude, latitude: shot.coords.latitude })
        })
    })
    let latLongCenter = geolib.getCenter(arrayOfShots)
    let center = {
        latitude: latLongCenter.latitude,
        longitude: latLongCenter.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }
    return center
}



const renderGameDetails = (game) => {
    
    if(game.id){
        let shots = game.fields.shots
        let location = findCenter(shots)
        return (
            <View>
                <Text>{game.fields.course.toString()}</Text>
                <Scorecard game={game.fields} gameScore={{ score: game.fields.score }} />
                <Map shots={shots} location={location} />
            </View>
            )
    } else {
        return (<Text>Please Wait For Game To Load</Text>)
    }
}


const NineteenthHole = (props) => {
    const [games, setGames] = useState([])
    const [gameIdx, setGameIdx] = useState(1)
    const [game, setGame] = useState({})
    const [view, setView] = useState(0)

    if (games.length === 0){
        fetchGames(setGames, setGame, view)
    }


    const strictness = () => {
        if (!!game.fields) { 
            if (game.fields.strict ) {
                return "strict"
            } else {
                return "casual"
            }
        }
    }


    return (
        <View style={styles.background}>
            <Spacer/>
            <View style={styles.buttonContainer}>
            <Button 
                color='rgb(255, 255, 255)'
                title='Next Game'
                onPress={async() => {
                    const newGameIdx = (gameIdx + 1) % games.length
                    const newGame = await fetchGameDetails(games[newGameIdx])
                    setGame(newGame)
                    setGameIdx(newGameIdx)
                }}
            />
            </View>
            <View style={styles.buttonContainer}>
            <Button 
                color='rgb(255, 255, 255)'
                title='Previous Game'
                onPress={async() => {
                    let newGameIdx = gameIdx - 1
                    if (gameIdx === 0){
                        newGameIdx = games.length - 1
                    } 
                    const newGame = await fetchGameDetails(games[newGameIdx])
                    setGame(newGame)
                    setGameIdx(newGameIdx)
                }}
            />
            </View>
            {renderGameDetails(game)}
            <Text>This was a {strictness()} game.</Text>
        </View>
    )
}

const styles = StyleSheet.create(styleSettings)

export default NineteenthHole;