import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext';
import axiosInstance from './../api/axiosInstance';
import { navigate } from './../navigationRef'

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'login':
            return {...state, token: action.payload.token, user: action.payload.email, errorMessage: ''}
        case 'logout':
            return {...state, token: '', user: '', errorMessage: ''}
        default:
            return state
    }
}

const tryLocalSignin = (dispatch) => async() => {
    const token = await AsyncStorage.getItem('token')
    if (token){
        const email = await AsyncStorage.getItem('visualScorecardUser')
        dispatch({ type: 'login', payload: { token, email } })
        navigate('Home')
    } else {
        navigate('SignupScreen')
    }
}

const signup = (dispatch) =>  async({email, password}) => {
    try {
        const response = await axiosInstance.post('/signup', {email, password})
        let token = response.data.token
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('visualScorecardUser', email);
        dispatch({ type: 'login', payload: { token, email }})
        navigate('Home')
    } catch(err) {
        dispatch({ type: 'add_error', payload: err.response.data })
    }
}


const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await axiosInstance.post('/signin', { email, password })
        let token = response.data.token
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('visualScorecardUser', email);
        dispatch({ type: 'login', payload: {token, email} })
        navigate('Home')
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data })
    }
}

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('visualScorecardUser');
    dispatch({type: 'logout'})
    navigate('SigninScreen')
}


export const {Provider, Context} = createDataContext(
    authReducer, 
    { signup, signin, signout, tryLocalSignin}, 
    {token: null, errorMessage: '', user: null}
)