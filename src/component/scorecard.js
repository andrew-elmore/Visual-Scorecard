import React, { usegameScore } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import styleSettings from './../styleSettings'

const Scorecard = (props) => {

    game = props.game
    gameScore = props.gameScore

    return (
        <View >
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
                    if (gameScore.score[hole]) {
                        score = gameScore.score[hole]
                        overUnder = parseInt(gameScore.score[hole]) - parseInt(par)
                    }
                    return (
                    <View style={styles.contents}>
                        <View style={styles.hole}><Text >{hole}</Text></View>
                        <View style={styles.par}><Text >{par}</Text></View>
                        <View style={styles.yards}><Text >{yards}</Text></View>
                        <View style={styles.score}><Text >{score}</Text></View>
                        <View style={styles.overUnder}><Text >{overUnder}</Text></View>
                    </View>
                    )
                }}
            />
            <View style={styles.totalScore} >
            <Text >Total Score: {
                Object.values(game.holes.par).reduce((a, b) => {
                    return parseInt(a) + parseInt(b)
                })

            } : {
                Object.values(gameScore.score).reduce((a, b) => {
                    return a + b
                })
            }</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create(styleSettings)


export default Scorecard;
