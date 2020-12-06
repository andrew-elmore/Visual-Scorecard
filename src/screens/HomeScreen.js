import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { fetchResults} from './../api/airtable'

const getLoc = () => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            console.log(pos)
        }
    );
}

const logRes = (res) =>{
    console.log('~~~~~~~~~~~~~~~~~~')
    console.log(res)
    console.log('~~~~~~~~~~~~~~~~~~')
}

const HomeScreen = (props) => {


    return (
        <View>
            <Button
                title='Casual Mode'
                onPress={() => props.navigation.navigate('CasualScreen')}
            />
            <Button
                title='List Results'
                onPress={() => 
                    fetchResults(logRes)
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;