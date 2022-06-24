'use strict'

console.log('working');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(cors());

class Forecast{
  constructor(weatherObj){
    this.datetime = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

app.get('/weather', async (request, response) => {
  try{
  const searchQuery = request.query.searchQuery;
  console.log(searchQuery);
  let lat = request.query.lat;
  console.log(lat);
  let lon = request.query.lon;
  console.log(lon);
  //let searchResult = data.find(object => object.city_name === searchQuery);
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
  let weatherInfo = await axios.get(url);
  let weatherData = weatherInfo.data.data.map(sky => new Forecast(sky));
  response.send(weatherData);
  //let dataSend = searchResult.data.data.map(day => new Forecast(day));
  //response.send(dataSend);
} catch (error) {
  console.log(error);
}

  //const result = new Forecast(searchResult);
  //console.log(result);
})

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('HELLO!');
})

app.get('*', (request, response) => {
  response.status(404).send('Get out!');
})


app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})