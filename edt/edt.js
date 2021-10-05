module.exports = { getEvents }

const google = require('googleapis')
const calendar = new google.calendar_v3.Calendar()



/* == Main function ==================================================================================== */

async function getEvents(api_key, calendarList, bounds) {
    let events = []
    
    for(const id of calendarList)
        events = events.concat(await getRawData(api_key, id, bounds))

    events = orderData(events)
    events = splitData(events)

    return events
}



/* == Retrieve calendar events from google calendar ==================================================== */

async function getRawData(api_key, calendarId, bounds) {

    const calendarData = await calendar.events.list({
        key: api_key,
        calendarId: calendarId,
        timeMin: bounds[0],
        timeMax: bounds[1]
    }).then(data => data.data.items.filter(i => i.status == "confirmed"))

    return calendarData

}



/* == Retain only important information from calendar events =========================================== */

function orderData(events) {
    let orderedEvents = events.map(e => new Object({
        raw: e.summary,
        infos: parseEventName(e.summary),
        start: e.start.date || e.start.dateTime,
        end: e.end.date || e.end.dateTime,
        group: e.organizer.displayName
    })).sort((a,b) => {
        const a_timestamp = (new Date(a.start)).getTime()
        const b_timestamp = (new Date(b.start)).getTime()
        return a_timestamp - b_timestamp
    })

    return orderedEvents
}



/* == Splitting the data into different sections ======================================================= */

function splitData(events) {
    const weeks = partition(events, (d) => {
        const weekNum = getWeekNum(d.start)
        return `S${weekNum}`
    })

    const days = {}
    for(const w of Object.entries(weeks)) {
        days[w[0]] = partition(w[1], (e) => new Date(e.start).toDateString())
    }

    return days
}

const partition = (events, getTag) => events.reduce((total, event) => {
    const tag = getTag(event)

    if(!total[tag]) total[tag] = []
    total[tag].push(event)

    return total
}, {})

function getWeekNum(timestamp) {
    const curDate = new Date(timestamp)
    var onejan = new Date(curDate.getFullYear(), 0, 1);
    return Math.ceil((((curDate - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}





function parseEventName(name) {
    const regexp = /(\*\*EXAMEN\*\*)? ?([A-Z]{5}\d[A-Z]\d)?(?: \( ?(.+)\))?(?: - )?(.*?)(?: - ([A-Z]\. .*|Xfreee?) - )(.*)/gm
    const data = regexp.exec(name)

    let info = {}

    if(data == null) {
        info = {
            isExam: false,
            code: undefined,
            type: 'Autre',
            lesson: name,
            prof: 'UPSSI-prof',
            room: 'Hors salle'
        }
    } else {
        info = {
            isExam: (data[1] != null),
            code: data[2],
            type: (data[3] == undefined) ? 'Autre' : data[3],
            lesson: data[4],
            prof: data[5],
            room: data[6]
        }
    }
    
    return info
}