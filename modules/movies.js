'use strict';

const axios = require('axios');

// async function getMovies(request, response, next){
//   try{
//     let searchQuery = request.query.searchQuery;
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
//     let cityMovie = await axios.get(url);
//     let movieArray = cityMovie.data.results.map(movie => new Movie(movie));
//     //console.log(cityMovie.data);
//     response.status(200).send(movieArray);
//   } catch (error){
//     next(error);
//   }
// }

// class Movie{
//   constructor(movieObj){
//     this.title = movieObj.title;
//     this.description = movieObj.overview;
//   }
// }
let cache = require('./cache.js');

async function getMovies(searchQuery) {
  const key = 'movie-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data));
  }

  return cache[key].data;
}

function parseMovie(movieData){
  try{
    const movieSummaries = movieData.data.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie{
  constructor(cityMovie){
    this.title = cityMovie.title;
    this.description = cityMovie.overview;
    this.avgVotes = cityMovie.vote_average;
    this.totalVotes = cityMovie.vote_count;
    this.popularity = cityMovie.popularity;
    this.releasedOn = cityMovie.released_date;
    this.img = cityMovie.poster_path;
  }
}
module.exports = getMovies;
