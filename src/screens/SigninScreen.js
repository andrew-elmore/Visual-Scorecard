import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Button, ImageBackground  } from 'react-native';
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
        <ImageBackground source={require('./../../assets/course.png')} style={styleSettings.background}>
            <Spacer/>
            <Text h3>Sign In</Text>
            <Spacer/>
            <View style={styleSettings.inputShadow}>
            <Spacer />
            <Input
                label="Email:"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={{color: 'black', backgroundColor: 'lightgrey'}}
                labelStyle={{color: 'black', fontSize: 20}}
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
                title="Sign In"
                onPress={() => { signin({ email, password }) }}
            />
            </View>

            <Spacer />

            <View style={styles.shadowButtonContainer}>
            <Button
                color="white"
                title="Demo Sign In"
                onPress={() => { signin({ email: 'demo@demo.com', password: 'demoPassword' }) }}
            />
            </View>

            <Spacer />
            
            <TouchableOpacity onPress={() => props.navigation.navigate('SignupScreen')}>
                <Text style={{ fontSize: 20 }}>Don't have an account? Sign up here.</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create(styleSettings)

export default SigninScreen;
