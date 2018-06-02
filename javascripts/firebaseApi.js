let firebaseConfig = {};
const setFirebaseConfig = input => { firebaseConfig = input; };

const saveMovieToWishlist = newMovie => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/movies.json`,
      data: JSON.stringify(newMovie),
    })
      .done(uniqueKey => {
        resolve(uniqueKey); // this 'uniqueKey' won't be used in this specific app
      })
      .fail(err => {
        reject(err);
      });
  });
};

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json`,
    })
      .done(allMoviesObject => { // allMoviesObject is an object of objects
        if (allMoviesObject !== null) {
          Object.keys(allMoviesObject).forEach(firebaseKey => {
            allMoviesObject[firebaseKey].id = firebaseKey;
            allMoviesArray.push(allMoviesObject[firebaseKey]);
          });
        }
        resolve(allMoviesArray); // returns an array of objects
      })
      .fail(err => reject(err));
  });
};

const deleteMovieFromDb = movieId => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail(err => {
        reject(err);
      });
  });
};

module.exports = {
  saveMovieToWishlist,
  setFirebaseConfig,
  getAllMovies,
  deleteMovieFromDb,
};
