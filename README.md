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


## New Game & New Course

Once signed in a user may start a new game. They will be able to choose from any course that has already been played by clicking on that course, or they may create their own coures by clicking the Create New Course button. 

<img src="assets/New_Game.png" alt="newGame" height="500"/>

If they decide to create a new course, they will be prompted to enter the name of the course and the par and yards of each hole on the course. This new course will then be saved to Airtable for any player to play from. 

<img src="assets/New_Course.png" alt="newCourse" height="500"/>

The par and yards information is stored using the useReducer hook. 
```
const reducer = (state, action) => {
    Object.freeze(state)
    let currentState = Object.assign({}, state)
    switch (action.type) {
        case 'par': // updatesPar
            currentState.par[action.payload.hole] = action.payload.newPar
            return { ...state, par: currentState.par }
        case 'yards': // updatesYards
            currentState.yards[action.payload.hole] = action.payload.newYards
            return { ...state, yards: currentState.yards }
        default:
            return state
    }
}
```

## Play

Once a player has selected or created a course they can start the game. 

<img src="assets/Game.png" alt="play" height="500"/>


## Review

<img src="assets/Review.gif" alt="Review" height="500"/>

