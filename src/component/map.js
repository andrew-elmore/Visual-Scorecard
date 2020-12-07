import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import MapView, { Polyline, Marker} from 'react-native-maps'

const Map = (props) => {

    const extractLatLng = (lat, lng) => {
        let latDiff = Math.max(...lat) - Math.min(...lat)
        let latitude = (Math.min(...lat) + latDiff)
        let latitudeDelta = (latDiff + 0.01)
        let lngDiff = Math.max(...lng) - Math.min(...lng)
        let longitude = (Math.min(...lng) + lngDiff)
        let longitudeDelta = (lngDiff + 0.01)
        return {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
        }
    }


    let initialRegion = {}

    // console.log(props.shots[1].length)
    if (props.shots[1].length === 0){
        initialRegion={
                latitude: props.currentPos.latitude,
                longitude: props.currentPos.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }
    } else {
        let lat = []
        let lng = []
        Object.values(props.shots).forEach((hole) => {
            hole.forEach((shot) => {
                lat.push(shot.coords.latitude)
                lng.push(shot.coords.longitude)
            })
        })

        res = extractLatLng(lat, lng)
        initialRegion= res
    }

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