import axiosAirtable from './airtableApi'


export const createGame = async (newGame) => {
    const res = await axiosAirtable.post('/scores', {
        "records": [
            {
                "fields": {
                    "date": JSON.stringify(Date.now()),
                    "score": JSON.stringify({ '1': 0 }),
                    "shots": JSON.stringify({ '1': [] }),
                    "holes": JSON.stringify({ 'par': {}, 'yards': {} }),
                    "course": JSON.stringify('placeholder'),
                    "complete": JSON.stringify(false)
                }
            }
        ]
    })
    return res.data.records[0].id
}

export const getIncompleteGame = async () => {
    const res = await axiosAirtable.get(`/scores?filterByFormula={complete}='false'`)
    if (res.data.records.length > 0){
        let results = res.data.records[0].id
        return results
    } else {
        return null
    }
}

export const fetchGameDetails = async(id) => {
    const res = await axiosAirtable.get(`/scores/${id}`)

    let game = {
        id: res.data.id,
        fields: {
            date: JSON.parse(res.data.fields.date) ,
            score: JSON.parse(res.data.fields.score) ,
            shots: JSON.parse(res.data.fields.shots) ,
            holes: JSON.parse(res.data.fields.holes) ,
            course: JSON.parse(res.data.fields.course) ,
            complete: JSON.parse(res.data.fields.complete) 
        },
        createdTime: res.data.createdTime
    }

    return game
}

export const updateGameDetails = async (data) => {
    const res = await axiosAirtable.patch(`/scores`, {
        "records": [
            {
                "id": data.id,
                "fields": {
                    "score": JSON.stringify(data.fields.score),
                    "shots": JSON.stringify(data.fields.shots),
                    "holes": JSON.stringify(data.fields.holes),
                    "course": JSON.stringify(data.fields.course),
                    "complete": JSON.stringify(data.fields.complete)
                }
            }
        ]
    })
}