import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';

const NineteenthHole = (props) => {
    let lastGame = props.navigation.state.params.lastGame
    return (
        <View>
            <Text>{lastGame.course}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default NineteenthHole;