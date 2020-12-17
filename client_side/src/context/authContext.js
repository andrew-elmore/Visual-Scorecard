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


const signup = (dispatch) =>  async({email, password}) => {
    try {
        const response = await axiosInstance.post('/signup', {email, password})
        let token = response.data.token
        await AsyncStorage.setItem('token', token);
        dispatch({ type: 'login', payload: token})
        console.log(token)
        navigate('HomeScreen')
    } catch(err) {
        dispatch({ type: 'add_error', payload: err.response.data })
    }
}


const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await axiosInstance.post('/signin', { email, password })
        let token = response.data.token
        await AsyncStorage.setItem('token', token);
        dispatch({ type: 'login', payload: {token, email} })
        navigate('HomeScreen')
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data })
    }
}

const signout = (dispatch) => async () => {
    await AsyncStorage.setItem('token', '');
    dispatch({type: 'logout'})
}


export const {Provider, Context} = createDataContext(
    authReducer, 
    { signup, signin, signout}, 
    {token: null, errorMessage: '', user: null}
)