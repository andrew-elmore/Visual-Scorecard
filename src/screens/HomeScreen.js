import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';

const getLoc = () => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            console.log(pos)
        }
    );
}

const HomeScreen = (props) => {


    return (
        <View>
            <Button
                title='Casual Mode'
                onPress={() => props.navigation.navigate('CasualScreen')}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;