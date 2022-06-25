'use strict';

console.log('working');

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

const getWeather = require('./modules/weather.js');
app.get('/weather', getWeather);

const getMovies = require('./modules/movies.js');
app.get ('/movies', getMovies);

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('HELLO!');
});

app.get('*', (request, response) => {
  response.status(404).send('Get out!');
});


app.listen(PORT, () => {console.log(`listening on port ${PORT}`);
});

// 'use strict';

// require('dotenv');
// const express = require('express');
// const cors = require('cors');

// const weather = require('./modules/weather.js');
// const app = express();

// app.get('/weather', weatherHandler);

// function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//   weather(lat, lon)
//   .then(summaries => response.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }

// app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
