/* eslint camelcase: 0 */

const dom = require('./dom');

let tmdbKey = '';
let imageConfig = {};

const setKey = input => {
  tmdbKey = input;
  getConfig();
};

const getImageConfig = () => imageConfig;

const getConfig = () => {
  tmdbConfiguration()
    .then(result => {
      imageConfig = result.images;
    })
    .catch(err => {
      console.error('error with tmdb: ', err);
    });
};

const tmdbConfiguration = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`)
      .done(data => {
        resolve(data);
      })
      .fail(err => {
        reject(err);
      });
  });
};

const searchTMDB = txt => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&page=1&include_adult=false&query=${txt}`)
      .done(result => {
        resolve(result.results);
      })
      .fail(error => {
        reject(error);
      });
  });
};

const showResults = searchText => {
  searchTMDB(searchText)
    .then(result => {
      dom.domString(result, imageConfig, 'movies');
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  showResults,
  setKey,
  searchTMDB,
  getImageConfig,
};
