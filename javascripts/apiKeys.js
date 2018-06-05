const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
// const auth = require('./auth');
const {checkLoginStatus,} = require('./auth');

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
      firebaseApi.setFirebaseConfig(results.firebase);
      firebase.initializeApp(results.firebase);
      // auth.checkLoginStatus();
      checkLoginStatus();
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  retrieveKeys,
};
