import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps'
import styleSettings from './../styleSettings'

const Spacer = (props) => {
    
    return (
       <View style={{height: 35}}></View>
    )
}

const styles = StyleSheet.create(styleSettings)


export default Spacer;
