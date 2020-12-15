import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import MapView, { Polyline, Marker} from 'react-native-maps'

const Map = (props) => {
    let pos = props.pos




    

    const extractLatLng = (lat, lng) => {
        let latDiff = Math.max(...lat) - Math.min(...lat)
        let latitude = (Math.min(...lat) + latDiff)
        let latitudeDelta = (latDiff + 0.0001)
        let lngDiff = Math.max(...lng) - Math.min(...lng)
        let longitude = (Math.min(...lng) + lngDiff)
        let longitudeDelta = (lngDiff + 0.0001)
        return {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
        }
    }

    if (props.shots[1].length > 0){
        let lat = []
        let lng = []
        Object.values(props.shots).forEach((hole) => {
            hole.forEach((shot) => {
                lat.push(shot.coords.latitude)
                lng.push(shot.coords.longitude)
            })
        })
        pos = extractLatLng(lat, lng)
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

const styles = StyleSheet.create({
    map: {
        height: 300,
        width: 400
    }
})

export default Map;
