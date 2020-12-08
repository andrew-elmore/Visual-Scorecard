
import { recordResults, fetchResults } from '../api/airtable'

let previousGame = false



const setGame = (res) => {
    previousGame = (res[0])
}

export const updatePreviousGame = () =>{
    fetchResults(setGame)
    console.log('updatePreviousGame', previousGame)
}

export const getPreviousGame = () => {
    updatePreviousGame()
    return previousGame
}