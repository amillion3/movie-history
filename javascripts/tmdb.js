/* eslint camelcase: 0 */

const dom = require('./dom');

let tmdbKey = '';

const setKey = input => {
  tmdbKey = input;
};

const searchTMDB = txt => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&page=1&include_adult=false&query=${txt}`)
      .done(result => {
        resolve(result);
      })
      .fail(error => {
        reject(error);
      });
  });
};

const showResults = searchText => {
  searchTMDB(searchText)
    .then(result => {
      dom.domString(result);
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  showResults,
  setKey,
  searchTMDB,
};
