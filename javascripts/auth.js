const {getAllMoviesEvent,} = require('./events');
// const {getAllMoviesEvent, initializer} = require('./events');
// this is for importing multiple keys (functions)

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').addClass('hide');
      // call the get movies
      // events.getAllMoviesEvent();
      getAllMoviesEvent();
    } else {
      // No user is signed in.
    }
  });
};

module.exports = {
  checkLoginStatus,
};
