var Airtable = require('airtable');
export const base = new Airtable({ apiKey: 'keyHyLPdaCbr7AoxH' }).base('appcMdRfjvZEs0zeX');

export const createNewGame = (game, setNewGameId) => {
    console.log('game created')
    base('scores').create([
        {
            "fields": {
                "date": JSON.stringify(Date.now()),
                "score": JSON.stringify(game.score),
                "shots": JSON.stringify(game.shots),
                'complete': JSON.stringify(game.complete)
            }
        },
    ], function (err, records) {
        if (err) {
            console.error(err);
            return;
        }
        setNewGameId(records[0].getId())
    });
}


export const recordResults = (game) => {
        base('scores').update([
            {
                "id": game.gameId,
                "fields": {
                    "course": JSON.stringify(game.course),
                    "score": JSON.stringify(game.score),
                    "shots": JSON.stringify(game.shots),
                    'complete': JSON.stringify(game.complete)
                }
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
        });
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