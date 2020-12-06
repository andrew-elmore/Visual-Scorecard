import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import MapView, { Polyline, Marker} from 'react-native-maps'

const Map = (props) => {
    let shots = []

    Object.values(props.shots).forEach((hole) => {
        holeShots = []
        hole.forEach((shot) => {
            holeShots.push({ longitude: shot.coords.longitude, latitude: shot.coords.latitude })
        })
        shots.push(holeShots)
    })

    console.log(shots)
    return (
        <MapView 
            style={styles.map}
            initialRegion={{
                latitude: 41.368350651818126,
                longitude: -71.9288097819818,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
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