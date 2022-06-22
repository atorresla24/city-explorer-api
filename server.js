'use strict'

console.log('working');

const express = require('express');
require('dotenv').config();
require('data/weather.json').config();

app.get('/weather', (request, response) => {
  console.log(description);
  let description = request.query.description;
  response.send()
})


const app = express();

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('hello from our server');
})

app.get('*', (request, response) => {
  response.send('Get out!');
})


app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})