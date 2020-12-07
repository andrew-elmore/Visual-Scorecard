import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import MapView, { Polyline, Marker} from 'react-native-maps'

const Map = (props) => {

    console.log(props)
    let shots = []

    Object.values(props.shots).forEach((hole) => {
        let holeShots = []
        hole.forEach((shot) => {
            holeShots.push({ longitude: shot.coords.longitude, latitude: shot.coords.latitude })
        })
        shots.push(holeShots)
    })

    return (
        <MapView 
            style={styles.map}
            initialRegion={{
                latitude: props.currentPos.latitude,
                longitude: props.currentPos.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }}
        >

            {shots.map((hole)=> {
                return <Polyline key={JSON.stringify(hole)} coordinates={hole}></Polyline>
            })}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 400,
        width: 400
    }
})

export default Map;