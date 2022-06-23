'use strict'

console.log('working');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');


const app = express();

class Forecast{
  constructor(weatherObj){
    this.datetime = weatherObj.datetime;
    this.description = weatherObj.description;
  }
}

app.get('/weather', (request, response) => {
  const searchQuery = request.query.searchQuery;
  console.log(searchQuery);
  let searchResult = data.find(object => object.city_name === searchQuery);
  response.send(searchQuery);

  const result = new Forecast(searchResult);
  console.log(result);
})

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from our server');
})

app.get('*', (request, response) => {
  response.send('Get out!');
})


app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})