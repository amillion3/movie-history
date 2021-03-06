const {getAllMoviesEvent,} = require('./events');
const {setUID,} = require('./firebaseApi');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUID(user.uid);
      // User is signed in now
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').addClass('hide');
      $('#mine, #navSearch, #logout').removeClass('hide');
      $('#authenticate').addClass('hide');
      // call the get movies
      getAllMoviesEvent();
    } else {
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
      $('#logout, #mine, #navSearch').addClass('hide');
      $('#authenticate').removeClass('hide');
    }
  });
};

module.exports = {
  checkLoginStatus,
};
