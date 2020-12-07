import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import Map from './../component/map'

const NineteenthHole = (props) => {
    let lastGame = props.navigation.state.params.lastGame
    let currentPos = props.navigation.state.params.currentPos
    return (
        <View>
            <Text>{lastGame.course}</Text>
            <Map shots={lastGame.shots} currentPos={currentPos} />
            <FlatList
                keyExtractor={score => {
                    return score[0].toString()
                }}
                data={Object.entries(lastGame.score)}
                renderItem={({ item, index }) => {
                    return (<Text>{`${item[0]}:  ${item[1]}`}</Text>)
                }}
            />
            <Text>Total Score: {
                Object.values(lastGame.score).reduce((a, b) => {
                    return a + b
                })
            }</Text>
            <Button
                title='HomeScreen'
                onPress={() => {
                    props.navigation.navigate('HomeScreen')
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default NineteenthHole;