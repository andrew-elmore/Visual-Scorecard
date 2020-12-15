import axiosAirtable from './airtableApi'


export const getIncompleteGame = async () => {
    const res = await axiosAirtable.get(`/course?filterByFormula={complete}='false'`)
    if (res.data.records.length > 0) {
        let results = res.data.records[0].id
        return results
    } else {
        return null
    }
}

export const createCourse = async (newCourse) => {
    console.log(newCourse)
    // const res = await axiosAirtable.post('/course', {
    //     "records": [
    //         {
    //             "fields": {
    //                 "name": JSON.stringify(newCourse.name),
    //                 "holes": JSON.stringify(newCourse.holes),
    //                 "location": JSON.stringify(newCourse.location),
    //             }
    //         }
    //     ]
    // })
    // return res.data.records[0].id
}