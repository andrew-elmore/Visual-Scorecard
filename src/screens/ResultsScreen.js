import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';

const ResultsScreen = (props) => {
    return (
        <View>
            <Text>{props.navigation.state.params.gameId}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ResultsScreen;