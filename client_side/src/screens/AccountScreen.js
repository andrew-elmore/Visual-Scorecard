import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { Context as AuthContext } from './../context/authContext'
import Spacer from './../component/spacer'
import styleSettings from './../styleSettings'

const AccountScreen = () => {
    const {  signout } = useContext(AuthContext)
    return (
        <View style={styles.background}>
            <Spacer/>
            <View style={styles.buttonContainer}>
                <Button
                    color='rgb(255, 255, 255)'
                    title="Sign Out"
                    onPress={() => signout()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    styleSettings
)

export default AccountScreen;