import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, Button, ImageBackground  } from 'react-native';
import {Text, Input} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Context as AuthContext} from './../context/authContext'
import styleSettings from './../styleSettings'
import Spacer from './../component/spacer'

const SignupScreen = (props) => {
    const {state, signup} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <ImageBackground source={require('./../../assets/course.png')} style={styleSettings.background}>
            <Spacer />
            <Text h3>Sign Up</Text>
            <Spacer />
            <View style={styleSettings.inputShadow}>
            <Spacer />
                <Input 
                    label="Email:" 
                    value={email} 
                    onChangeText={setEmail} 
                    autoCapitalize="none" 
                    autoCorrect={false}
                    inputStyle={{ color: 'black', backgroundColor: 'lightgrey' }}
                    labelStyle={{ color: 'black', fontSize: 20 }}
                />
                <Input 
                    label="Password:" 
                    value={password} 
                    onChangeText={setPassword} 
                    autoCapitalize="none" 
                    autoCorrect={false}
                    secureTextEntry
                    inputStyle={{ color: 'black', backgroundColor: 'lightgrey' }}
                    labelStyle={{ color: 'black', fontSize: 20 }}
                />
                <Text>{state.errorMessage}</Text>
            </View>
            <Spacer />
            <View style={styles.shadowButtonContainer}>
            <Button
                color="white"
                title="Sign Up"
                onPress={() => {signup({email, password})}}
            />
            </View>
            <Spacer />
            

            <TouchableOpacity onPress={() => props.navigation.navigate('SigninScreen')}>
                <Text style={{ fontSize: 20}}>Already have an account? Sign in instead.</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create(styleSettings)

export default SignupScreen;