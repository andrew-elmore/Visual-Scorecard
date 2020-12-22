const axios = require('axios')

let scores = [[[41.39487202042702, -71.86156742213633],
[41.396606339812486, -71.86170042946775],
[41.39763551758533, -71.8618689397189],
[41.397694404056224, -71.8619177066539],]
    ,
    [[41.3994802726344, -71.86078353751391],
[41.40075426861054, -71.85986048162339],
    [41.40213088305319, -71.85932157226092],
    [41.40218707566584, -71.85917162117775],]
,
[[41.40274032893125, -71.85830702752938],
[41.4005667954324, -71.85831593936155],
[41.399378224392784, -71.85816112686985],
[41.399536634056105, -71.85812062574185],]
    ,
    [[41.3985314325625, -71.8578730058443],
    [41.39955028019689, -71.86002019290403],
    [41.39896752101676, -71.86113220700597],
    [41.39895479974122, -71.8611133735163],]
    ,
    [[41.39871126048107, -71.86202713252206],
    [41.397033506286284, -71.86046583503835],
    [41.39670267862013, -71.85912207977115],
    [41.39626661711642, -71.85839625873973],
    [41.396291609585305, -71.85833331231389],]
    ,
    [[41.39503972351111, -71.85902682016938],
    [41.39413094271133, -71.8605453879748],
    [41.39416740301319, -71.86054585274728],]
    ,
    [[41.39378929240278, -71.8598814855774],
    [41.3928370130683, -71.85776367255946],
    [41.39193665456267, -71.85682738143375],
    [41.3913998053047, -71.85630956930375],
    [41.39132598943634, -71.85629074741526],]
    ,
    [[41.39114661988992, -71.8568324002622],
    [41.39138165560554, -71.85776542090798],
    [41.39140306563193, -71.85791321942133],]
    ,
    [[41.391832170251725, -71.85820774715386],
    [41.39286682161721, -71.85923598561914],
    [41.393620256568205, -71.86054063321569],
    [41.39366394779001, -71.86046879200082],]]

let shots = {}
let course = 'Elmridge Blue'
let score = {}
let startTime = Date.now()
scores.forEach((hole, idx) => {
    shots[idx + 1] = hole.map((shot, sIdx) => {
        let latitude = shot[0]
        let longitude = shot[1]
        return ({
            coords: {
                accuracy: 65,
                altitude: 0,
                altitudeAccuracy: 10,
                heading: -1,
                latitude: latitude,
                longitude: longitude,
                speed: -1
            },
            timestamp: startTime + (300000 * (sIdx + Object.values(score).length))
        })
    })
    score[idx + 1] = hole.length
})


const axiosAirtable = axios.create({
    baseURL: 'https://api.airtable.com/v0/appcMdRfjvZEs0zeX',
    headers: {
        Authorization: 'Bearer keyHyLPdaCbr7AoxH'
    }
})

const holes = {
    par:{
        1: 4,
        2: 4,
        3: 4,
        4: 4,
        5: 5,
        6: 3,
        7: 5,
        8: 3,
        9: 4,
    },
    yards: {
        1: 344,
        2: 350,
        3: 334,
        4: 343,
        5: 504,
        6: 192,
        7: 492,
        8: 128,
        9: 343,
    }
}


axiosAirtable.post('/scores', {
    "records": [
        {
            "fields": {
                "date": JSON.stringify(startTime),
                "user": JSON.stringify('demo@demo.com'),
                "score": JSON.stringify(score),
                "shots": JSON.stringify(shots),
                "holes": JSON.stringify(holes),
                "course": JSON.stringify(course),
                "complete": JSON.stringify(true),
                "strict": JSON.stringify(false),
            }
        }
    ]
})

