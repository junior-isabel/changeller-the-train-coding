const express = require('express')
const DataStore = require('nedb');
const fetch = require('node-fetch');


const app = express();

app.listen(3000, () => {
  console.log("running server, port 3000")
})
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))

const database = new DataStore({
  filename: 'database.db',
  autoload: true
})
app.get('/api', (request, response) => {

  database.find({}, (err, data) => {

    if (err) {
      response.end();
      return
    }

    response.json(data)
  })
})
app.post('/api', (request, response) => {

  console.log(request.body)
  const { lat, lon, mood, image64 } = request.body
  const timestamp = Date.now()
  database.insert({
    lat,
    lon,
    mood,
    image64,
    timestamp,
  })
  response.json({
    status: 'success',
    latitude: lat,
    longitude: lon,
    mood
  })
})

app.get('/api/weather/:latlon', async (request, response) => {

  const latlon = request.params.latlon.split(',')
  const lat = latlon[0]
  const lon = latlon[1]
  const apiKey = '44bdb34eb1b1c39576d0076f3a0f3a12'

  const response_fetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  const json = await response_fetch.json();

  response.json(json)



})