# Visual Scorecard

## Overview

Visual Scorecard is a golf scorecard app which tracks score and adds the posistion of each stroke to a map. Once the game is complete the user can look back on their past games using the review feature. Visual Scorecard utilizes React Native to interact with IOS and Andriod, a node server to handle authentication, and Airtable as the database. 

## Sign in & Sign up

When a user opens the app they can either login or sign up. To login a user must press the login button and enter their credentials, or press the demo login button. Once logged in their session is saved with a session token and their email in AsyncStorage. 

```javascript
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
```

If a user wishes to create an account they must enter their email and a password. They are then logged in and a a session token and their email is saved in AsyncStorage

```javascript
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
```


## New Game

<img src="assets/New_Game.png" alt="newGame" height="500"/>

## New Course

![newCourse](assets/New_Course.png =250x)

## Play

![play](assets/Game.png =250x)

## Review

![review](assets/Review.gif =250x)
