import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as AuthContext } from './../context/authContext'
import Spacer from './../component/spacer'
import styleSettings from './../styleSettings'



const SigninScreen = (props) => {
    const {state, signin, tryLocalSignin} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    return (
        <View style={styles.background}>
            <Spacer/>
            <Text h3>Sign In</Text>
            <Spacer/>
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
                secureTextEntry
            />
            <Text>{state.errorMessage}</Text>
            <Spacer />
            <View style={styles.buttonContainer}>
            <Button
                color="white"
                title="Sign In"
                onPress={() => { signin({ email, password }) }}
            />
            </View>

            <Spacer />

            <View style={styles.buttonContainer}>
            <Button
                color="white"
                title="Demo Sign In"
                onPress={() => { signin({ email: 'demo@demo.com', password: 'demoPassword' }) }}
            />
            </View>

            <Spacer />
            
            <TouchableOpacity onPress={() => props.navigation.navigate('SignupScreen')}>
                <Text>Don't have an account? Sign up here.</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create(styleSettings)

export default SigninScreen;
