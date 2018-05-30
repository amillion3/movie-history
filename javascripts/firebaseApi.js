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

module.exports = {
  saveMovieToWishlist,
  setFirebaseConfig,
};
