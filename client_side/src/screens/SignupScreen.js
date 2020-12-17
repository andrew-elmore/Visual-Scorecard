import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Context as AuthContext} from './../context/authContext'

const SignupScreen = (props) => {
    const {state, signup} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <>
            <Text h3>Sign Up</Text>
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
                title="Sign Up"
                onPress={() => {signup({email, password})}}
            />

            <TouchableOpacity onPress={() => props.navigation.navigate('SigninScreen')}>
                <Text>Already have an account? Sign in instead.</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({

})

export default SignupScreen;