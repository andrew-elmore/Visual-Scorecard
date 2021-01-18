import React, { useState, useReducer, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Button, FlatList, ImageBackground  } from 'react-native';
import { Context as AuthContext } from './../context/authContext'

const LandingScreen = (props) => {
    const { state, signin, tryLocalSignin } = useContext(AuthContext)
    useEffect(() => {
        tryLocalSignin()
    }, [])
    return (
        null
    )
}

const styles = StyleSheet.create({

})

export default LandingScreen;