import axios from 'axios'

// export const fetchLastGame = () => {
//     console.log('fetchLastGame')
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("data that has been retrived")
//         }, 3000)
//         setTimeout(() => {
//             reject("No data that has been retrived")
//         }, 3000)
//     })
//     promise.then((res) => console.log(res)).catch((err) => console.log(err))
// }

// export const tracker = () => {
//     console.log('tracker')
// }
export default axios.create({
    baseURL: 'https://api.airtable.com/v0/appcMdRfjvZEs0zeX/scores',
    headers: {
        Authorization: 'Bearer keyHyLPdaCbr7AoxH'
    }
})