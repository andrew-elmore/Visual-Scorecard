import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';

const ResultsScreen = (props) => {
    console.log(props.navigation.state.params.previousGame)
    return (
        <View>
            <Text>{props.navigation.state.params.previousGame}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ResultsScreen;