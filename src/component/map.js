import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import MapView, {Polyline} from 'react-native-maps'

const Map = (props) => {
    const [mapCenter, setMapCenter] = useState([0, 0])

    navigator.geolocation.getCurrentPosition(
        pos => {
            setMapCenter([pos.coords.latitude, pos.coords.longitude])
        }
    );


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
            {/* <Polyline coordinates={points}></Polyline> */}
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