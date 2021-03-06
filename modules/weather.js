// 'use strict';
// const axios = require('axios');

// async function getWeather(request, response, next){
//   try{
//     const searchQuery = request.query.searchQuery;
//     console.log(searchQuery);
//     let lat = request.query.lat;
//     console.log(lat);
//     let lon = request.query.lon;
//     console.log(lon);
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
//     let weatherInfo = await axios.get(url);
//     let weatherData = weatherInfo.data.data.map(sky => new Forecast(sky));
//     //let dataSend = searchResult.data.data.map(day => new Forecast(day));
//     //response.send(dataSend);
//     response.status(200).send(weatherData);
//   } catch (error) {
//     console.log('getWeather error');
//     console.log(error);
//     next (error);
//   }
// }

// class Forecast{
//   constructor(weatherObj){
//     this.datetime = weatherObj.datetime;
//     this.description = weatherObj.weather.description;
//   }
// }

// module.exports = getWeather;

'use strict';

let cache = require('./cache.js');
const axios = require('axios');

async function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
    this.temp = day.temp;
    this.min_temp = day.min_temp;
    this.max_temp = day.max_temp;
  }
}

module.exports = getWeather;
