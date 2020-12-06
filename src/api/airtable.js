var Airtable = require('airtable');
export const base = new Airtable({ apiKey: 'keyHyLPdaCbr7AoxH' }).base('appcMdRfjvZEs0zeX');

export const recordResults = (score, shots, complete, gameId, setGameId) => {
    if (gameId){
        base('scores').update([
            {
                "id": gameId,
                "fields": {
                    // "date": 'null',
                    "score": JSON.stringify(score),
                    "shots": JSON.stringify(shots),
                    'complete': JSON.stringify(complete)
                }
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
        });
    } else {
        base('scores').create([
            {
                "fields": {
                    "date": JSON.stringify(Date.now()),
                    "score": JSON.stringify(score),
                    "shots": JSON.stringify(shots),
                    'complete': JSON.stringify(complete)
                }
            },
        ], function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                setGameId(records[0].getId())
        });
    }
}

export const fetchResults = (handleRes) => {
    base('scores').select({
        filterByFormula: `complete= 'false'`,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        let res = []
        records.forEach(function (record) {
            res.push({
                id: record.getId(),
                date: JSON.parse(record.get('date')),
                score: JSON.parse(record.get('score')),
                shots: JSON.parse(record.get('shots')),
                complete: JSON.parse(record.get('complete')),
            })
        });
        fetchNextPage();
        
        handleRes(res)
    }, function done(err) {

        if (err) { 
            console.error(err); 
            return; 
        }
    });

}