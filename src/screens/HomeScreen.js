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





const HomeScreen = (props) => {

    // const [previousGame, setPreviousGame] = useState({})

    let previousGame = {}

    const logRes = (res) => {
        previousGame = (res[0])
    }

    fetchResults(logRes)


    return (
        <View>
            <Button
                title='Resume Last Game Casual Mode'
                onPress={() => 
                    props.navigation.navigate('CasualScreen', {previousGame: previousGame})
                }
            />
            <Button
                title='Casual Mode'
                onPress={() => 
                    props.navigation.navigate('CasualScreen', {previousGame: false})
                }
            />
            <Button
                title='List Results'
                onPress={() => 
                    // fetchResults(logRes)
                    console.log(previousGame)
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;