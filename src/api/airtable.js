var Airtable = require('airtable');
export const base = new Airtable({ apiKey: 'keyHyLPdaCbr7AoxH' }).base('appcMdRfjvZEs0zeX');

export const recordResults = (score, shots, complete) => {
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
        records.forEach(function (record) {
            console.log(record.getId());
        });
    });
}


// export const fetchResults = () => {
//     base('scores').select({
//         // Selecting the first 3 records in Grid view:
//         // maxRecords: 3,
//         view: "Grid view"
//     }).eachPage(function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.

//         records.forEach(function (record) {
//             console.log("~~~~~~~")
//             console.log('Retrieved', record.get('date'));
//             console.log('Retrieved', record.get('score'));
//             console.log('Retrieved', record.get('shots'));
//             console.log('Retrieved', record.get('complete'));
//             console.log("~~~~~~~")
//         });

//         // To fetch the next page of records, call `fetchNextPage`.
//         // If there are more records, `page` will get called again.
//         // If there are no more records, `done` will get called.
//         fetchNextPage();

//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });

// }
export const fetchResults = (handleRes) => {
    base('scores').select({
        // Selecting the first 3 records in Grid view:
        // maxRecords: 3,
        filterByFormula: `complete= 'false'`,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        let res = []
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
            res.push({
                date: JSON.parse(record.get('date')),
                score: JSON.parse(record.get('score')),
                shots: JSON.parse(record.get('shots')),
                complete: JSON.parse(record.get('complete')),
            })
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        
        handleRes(res)
    }, function done(err) {

        if (err) { 
            console.error(err); 
            return; 
        }
    });

}