import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import MapView, { Polyline, Marker} from 'react-native-maps'
import styleSettings from './../styleSettings'

const Map = (props) => {
    let pos = props.pos

    
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
            initialRegion={pos}
            region={props.location}
            showsUserLocation={true} 
            >


            {shots.map((hole)=> {
                return <Polyline key={Math.random().toString()} coordinates={hole}></Polyline>
            })}
        </MapView>
    )
}

const styles = StyleSheet.create(styleSettings)


export default Map;
