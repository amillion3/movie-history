const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');

const myLinks = () => {
  $(document).click(e => {
    console.log(e);
    if (e.target.id === 'nav-auth') {
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
    } else if (e.target.id === 'nav-my-movies') {
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').addClass('hide');
      getAllMoviesEvent();
    } else if (e.target.id === 'nav-search') {
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
      $('#authScreen').addClass('hide');
    }
  });
};

const pressEnter = () => {
  $(document).keypress(e => {
    if (e.key === 'Enter') {
      const searchWords = $('#search-bar').val().replace(' ', '%20');
      tmdb.showResults(searchWords);
    }
  });
};

const saveMovieToWishListEvent = e => {
  $(document).on('click', '.addMovieToWishList', e => {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      'title': movieToAddCard.find('.movie-title').text(),
      'overview': movieToAddCard.find('.movie-overview').text(),
      'poster_path': movieToAddCard.find('img').data('poster'),
      'rating': 0,
      'isWatched': false,
    };
    firebaseApi.saveMovieToWishlist(movieToAdd)
      .then(() => {
        movieToAddCard.remove();
      })
      .catch(err => {
        console.error('Uh oh...error in saving movie ', err);
      });
  });
};

const getAllMoviesEvent = () => {
  firebaseApi.getAllMovies()
    .then(moviesArray => {
      dom.domString(moviesArray, tmdb.getImageConfig(), '#savedMovies');
    })
    .catch(err => {
      console.error('Error in get all movies ', err);
    });
};

const deleteMovieFromFirebase = e => {
  $(document).on('click', '.deleteMovieFromCollectionEvent', () => {
    const movieToDeleteId = $(e.target).closest('').data('firebaseId');
    firebaseApi.deleteMovieFromDb(movieToDeleteId);
    // $(`#${movieToDeleteId}`).remove();
  });
};

const initializer = () => {
  myLinks();
  pressEnter();
  saveMovieToWishListEvent();
  deleteMovieFromFirebase();
};

module.exports = {
  initializer,
};
