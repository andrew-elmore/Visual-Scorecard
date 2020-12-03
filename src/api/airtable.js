var Airtable = require('airtable');
export const base = new Airtable({ apiKey: 'keyHyLPdaCbr7AoxH' }).base('appcMdRfjvZEs0zeX');

export const recordResults = (score, shots) => {
    base('scores').create([
        {
            "fields": {
                "date": JSON.stringify(Date.now()),
                "score": JSON.stringify(score),
                "shots": JSON.stringify(shots)
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