import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import axiosInstance from './../api/axiosInstance';
import { navigate } from './../navigationRef'
import { createGame, getIncompleteGame, getGameDetails, patchGameDetails, getAllGames } from './../api/scores'

const gameReducer = (state, action) => {
    let currentState = Object.assign({}, state)
    switch (action.type) {
        case 'newGame': // carries stroke actions
            return { ...state, gameId: action.payload.gameId, strict: action.payload.strict }
        case 'stroke': // carries stroke actions
            currentState.score[state.hole] += 1
            return { ...state, score: currentState.score }
        case 'inCup': // does not update score or record a shot
            currentState.score[state.hole + 1] = 0
            currentState.shots[state.hole + 1] = []
            return { ...state, score: currentState.score, shots: currentState.shots, hole: state.hole + 1 }
        case 'gameFinished':
            currentState.complete = true
            updateGameDetails({ id: action.payload.gameId, fields: currentState })
            return { ...state, complete: true }
        case 'recordShot': // records a shot and updates the database
            currentState.shots[state.hole].push(action.payload.pos)
            updateGameDetails({ id: action.payload.gameId, fields: currentState })
            return { ...state, shots: currentState.shots }
        default:
            return state
    }
}

const makeNewGame = (dispatch) => async (strict) => {
    const gameId = await createGame(strict)
    dispatch({ type: 'newGame', payload: { gameId, strict } })
}



export const { Provider, Context } = createDataContext(
    gameReducer,
    { makeNewGame },
    { 
        gameId: null,
        date: Date.now(),
        course: 'placeholder',
        score: { '1': 0 },
        shots: { '1': [] },
        holes: { 'par': {}, 'yards': {} },
        complete: false,
        strict: null
    }
)