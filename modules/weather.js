'use strict';
const axios = require('axios');

async function getWeather(request, response, next){
  try{
    const searchQuery = request.query.searchQuery;
    console.log(searchQuery);
    let lat = request.query.lat;
    console.log(lat);
    let lon = request.query.lon;
    console.log(lon);
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
    let weatherInfo = await axios.get(url);
    let weatherData = weatherInfo.data.data.map(sky => new Forecast(sky));
    //let dataSend = searchResult.data.data.map(day => new Forecast(day));
    //response.send(dataSend);
    response.status(500).send(weatherData);
  } catch (error) {
    next (error);
  }
}

class Forecast{
  constructor(weatherObj){
    this.datetime = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

module.exports = getWeather;
