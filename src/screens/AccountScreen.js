import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Button, FlatList, ImageBackground  } from 'react-native';
import { Context as AuthContext } from './../context/authContext'
import Spacer from './../component/spacer'
import styleSettings from './../styleSettings'

const AccountScreen = () => {
    const {  signout } = useContext(AuthContext)
    return (
        <ImageBackground source={require('./../../assets/course.png')} style={styleSettings.background}>
            <Spacer/>
            <View style={styles.buttonContainer}>
                <Button
                    color='rgb(255, 255, 255)'
                    title="Sign Out"
                    onPress={() => signout()}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create(
    styleSettings
)

export default AccountScreen;