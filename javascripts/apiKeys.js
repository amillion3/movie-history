const tmdb = require('./tmdb');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('../db/apiKey.json')
      .done(data => {
        resolve(data.apiKeys);
      })
      .fail(error => {
        reject(error);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then(results => {
      tmdb.setKey(results.tmdb.apiKey);
      firebase.initializeApp(results.firebase);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  retrieveKeys,
};
