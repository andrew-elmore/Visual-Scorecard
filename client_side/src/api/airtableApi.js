import axios from 'axios'


export default axios.create({
    baseURL: 'https://api.airtable.com/v0/appcMdRfjvZEs0zeX',
    headers: {
        Authorization: 'Bearer keyHyLPdaCbr7AoxH'
    }
})