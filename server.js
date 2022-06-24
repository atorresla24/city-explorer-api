'use strict'

console.log('working');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const { nextTick } = require('process');


const app = express();
app.use(cors());

class Forecast{
  constructor(weatherObj){
    this.datetime = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

app.get('/weather', (request, response) => {
  try{
  const searchQuery = request.query.searchQuery;
  console.log(searchQuery);
  let searchResult = data.find(object => object.city_name === searchQuery);
  let dataSend = searchResult.data.map(day => new Forecast(day));
  response.send(dataSend);
} catch (error) {
  next(error);
}

  //const result = new Forecast(searchResult);
  console.log(result);
})

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from our server');
})

app.get('*', (request, response) => {
  response.send('Get out!');
})


app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})