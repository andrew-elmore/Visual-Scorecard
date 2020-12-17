import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { Context as AuthContext } from './../context/authContext'
import Spacer from './../component/spacer'

const AccountScreen = () => {
    const {  signout } = useContext(AuthContext)
    return (
        <View>
            <Spacer/>
            <Text>AccountScreen</Text>
            <Button
                title="Sign Out"
                onPress={() => signout()}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default AccountScreen;