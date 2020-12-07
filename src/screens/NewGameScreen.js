import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { fetchNewGameId } from './../game/newGame'

const NewGameScreen = (props) => {

    return (
        <View>
            <Button
                title='Casual Mode'
                onPress={() => {
                    let gameId = fetchNewGameId()
                    props.navigation.navigate('CasualScreen', { previousGame: false })
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default NewGameScreen;