import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import styleSettings from './../styleSettings'

const ResultsScreen = (props) => {
    return (
        <View>
            <Text>{props.navigation.state.params.gameId}</Text>
        </View>
    )
}

const styles = StyleSheet.create(styleSettings)

export default ResultsScreen;