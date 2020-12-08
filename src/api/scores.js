import axiosAirtable from './airtableApi'


export const createGame = async () => {
    const res = await axiosAirtable.post('/scores', {
        "records": [
            {
                "fields": {
                    "date": "1607395386032",
                    "score": "{\"1\":0}",
                    "shots": "{\"1\":[]}",
                    "complete": "false"
                }
            }
        ]
    })
    console.log('createGame', res.data.records[0].id)
    return res.data.records[0].id
}

export const getIncompleteGame = async () => {
    const res = await axiosAirtable.get(`/scores?filterByFormula={complete}='false'`)
    if (res.data.records.length > 0){
        let results = res.data.records[0].id
        console.log(`getIncompleteGame:`, results)
        return results
    } else {
        return null
    }
}