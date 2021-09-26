const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

// Read environment variables from .env file 
require('dotenv').config()

app.get('/', (req, res) => {
    res.json({ message: 'Behold The MEVN Stack!' })
})

const edt = require('./edt/edt')
const links = require('./edt/links')
const API_KEY = process.env.API_KEY

app.get('/events', (req, res) => {
    const calendarList = [links.EDT_1A.COMMON, links.EDT_1A.MAIN, links.EDT_1A.GROUP_1]
    edt.getEvents(API_KEY, calendarList).then(data => res.json(data))
})

const port = process.env.SERVER_PORT || 4000
app.listen(port, console.log(`Listen on port ${port}\n🚀 Server ready at http://localhost:${port}/`))
