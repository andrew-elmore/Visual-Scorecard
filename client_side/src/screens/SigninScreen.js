import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as AuthContext } from './../context/authContext'
import Spacer from './../component/spacer'


const SigninScreen = (props) => {
    const {state, signin} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <>
            <Spacer/>
            <Text h3>Sign In</Text>
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            // secureTextEntry
            />
            <Text>{state.errorMessage}</Text>
            <Button
                title="Sign In"
                onPress={() => { signin({ email, password }) }}
            />
            <Button
                title="Demo Sign In"
                onPress={() => { signin({ email: 'demo@demo.com', password: 'demoPassword' }) }}
            />

            <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                <Text>Don't have an account? Sign up here.</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({

})

export default SigninScreen;
