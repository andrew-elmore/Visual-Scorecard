import axiosAirtable from './airtableApi'


export const getCourses = async () => {
    const res = await axiosAirtable.get(`/courses?`)
    if (res.data.records.length > 0) {
        let results = res.data.records.map((record) => {
            return({
                name: JSON.parse(record.fields.name),
                holes: JSON.parse(record.fields.holes),
                location: JSON.parse(record.fields.location)
            })
        })
        return results
    } else {
        return null
    }
}

export const createCourse = async (newCourse) => {
    console.log(newCourse)
    const res = await axiosAirtable.post('/courses', {
        "records": [
            {
                "fields": {
                    "name": JSON.stringify(newCourse.name),
                    "holes": JSON.stringify(newCourse.holes),
                    "location": JSON.stringify(newCourse.location),
                }
            }
        ]
    })
    return res.data.records[0].id
}