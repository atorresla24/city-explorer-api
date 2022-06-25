'use strict';

const axios = require('axios');

async function getMovies(request, response, next){
  try{
    let searchQuery = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    let cityMovie = await axios.get(url);
    let movieArray = cityMovie.data.results.map(movie => new Movie(movie));
    //console.log(cityMovie.data);
    response.status(500).send(movieArray);
  } catch (error){
    next(error);
  }
}

class Movie{
  constructor(movieObj){
    this.title = movieObj.title;
    this.description = movieObj.overview;
  }
}

module.exports = getMovies;
