const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

// Read environment variables from .env file
require('dotenv').config()
require('./edt/date-util').setupDates()



/* == ROUTING ===================================================================================== */

app.get('/', (req, res) => {
    res.json({ message: 'Behold The MEVN Stack!' })
})

const edt = require('./edt/edt')
const links = require('./edt/links')
const API_KEY = process.env.API_KEY

app.get('/events/week', async (req, res) => {
  
  // Get beginning and end of week
  const week = (req.query['w']) ? req.query['w'] : new Date().getWeek()
  const year = Date.schoolYear(week)
  const bounds = [Date.dayOfWeek(year, week, 1), Date.dayOfWeek(year, week, 6)]

  // Get calendar list
  const calendarList = [links.EDT_1A.COMMON, links.EDT_1A.MAIN, links.EDT_1A.GROUP_1]

  const events = await edt.getEvents(API_KEY, calendarList, bounds)
  
  res.json(events)
})

app.get('/events/module/:code', (req, res) => {
  // TODO: waiting for proper module parsing
})



/* == SERVER LAUNCH =============================================================================== */

const port = process.env.SERVER_PORT || 4000
app.listen(port, console.log(`[🚀] Server ready at http://localhost:${port}/`))
