import axios from 'axios'
import authorization from './../../config/airtableKey'


export default axios.create({
    baseURL: 'https://api.airtable.com/v0/appcMdRfjvZEs0zeX',
    headers: {
        Authorization: authorization
    }
})