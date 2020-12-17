import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import { getAllGames, fetchGameDetails } from '../api/scores'
import Map from './../component/map'
import Scorecard from './../component/scorecard'
import * as geolib from 'geolib';
import styleSettings from './../styleSettings'
import Spacer from './../component/spacer'

const fetchGames = async (setGames, setGame) =>{
    const games = await getAllGames()
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
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
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

    if (games.length === 0){
        fetchGames(setGames, setGame)
    }





    return (
        <View>
            <Spacer/>
            <Button 
                title='Next Game'
                onPress={async() => {
                    const newGameIdx = (gameIdx + 1) % games.length
                    const newGame = await fetchGameDetails(games[newGameIdx])
                    setGame(newGame)
                    setGameIdx(newGameIdx)
                }}
            />
            <Button 
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
  
            {renderGameDetails(game)}
        </View>
    )
}

const styles = StyleSheet.create(styleSettings)

export default NineteenthHole;