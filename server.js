'use strict';

console.log('working');

const express = require('express');
require('dotenv').config();
//let data = require('./data/weather.json');
const cors = require('cors');
//const axios = require('axios');
const weather = require('./modules/weather.js');
const movies = require('./modules/movies');


const app = express();
app.use(cors());

app.get('/weather', getWeather);
app.get('./movies', getMovies);

function getWeather(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

function getMovies(request, response){
  const city = request.query.searchQueryCity;
  movies(city).then(summaries => response.send (summaries)).catch((error) => {
    console.log(error);
    response.status(200).send('Sorry. Something went wrong getting movies!');
  });
}

// app.use((error, request, response) => {
//   response.status(500).send(error.message);
// });

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('HELLO!');
});

app.get('*', (request, response) => {
  response.status(404).send('Get out!');
});


app.listen(PORT, () => { console.log(`listening on port ${PORT}`);
});

// class Forecast {
//   constructor(weatherObj) {
//     this.datetime = weatherObj.datetime;
//     this.description = weatherObj.weather.description;
//   }
// }

// app.get('/weather', async (request, response) => {
//   try {
//     const searchQuery = request.query.searchQuery;
//     console.log(searchQuery);
//     let lat = request.query.lat;
//     console.log(lat);
//     let lon = request.query.lon;
//     console.log(lon);
//     //let searchResult = data.find(object => object.city_name === searchQuery);
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
//     let weatherInfo = await axios.get(url);
//     let weatherData = weatherInfo.data.data.map(sky => new Forecast(sky));
//     response.send(weatherData);
//     //let dataSend = searchResult.data.data.map(day => new Forecast(day));
//     //response.send(dataSend);
//   } catch (error) {
//     console.log(error);
//   }

//   //const result = new Forecast(searchResult);
//   //console.log(result);
// });

// app.get('/movies', getMovies);

// async function getMovies(request, response) {
//   try {
//     let searchQuery = request.query.searchQuery;
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
//     let cityMovie = await axios.get(url);
//     let movieArray = cityMovie.data.results.map(movie => new Movie(movie));
//     //console.log(cityMovie.data);
//     response.send(movieArray);
//   } catch (error) {
//     console.log(error);
//   }
// }

// class Movie {
//   constructor(movieObj) {
//     this.title = movieObj.title;
//     this.description = movieObj.overview;
//   }
// }

// 'use strict';

// require('dotenv');
// const express = require('express');
// const cors = require('cors');

// const weather = require('./modules/weather.js');
// const app = express();

// app.use(cors());
// app.get('/weather', weatherHandler);

// function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//   weather(lat, lon)
//     .then(summaries => response.send(summaries))
//     .catch((error) => {
//       console.error(error);
//       response.status(200).send('Sorry. Something went wrong!');
//     });
// }

// app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
