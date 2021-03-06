const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');

const myLinks = () => {
  $(document).click(e => {
    console.log(e);
    if (e.target.id === 'authenticate') {
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
    } else if (e.target.id === 'mine') {
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').addClass('hide');
      getAllMoviesEvent();
    } else if (e.target.id === 'navSearch') {
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
      $('#authScreen').addClass('hide');
    }
  });
};

const pressEnter = () => {
  $(document).keypress(e => {
    if (e.key === 'Enter' && !$('#search').hasClass('hide')) {
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
      dom.domString(moviesArray, tmdb.getImageConfig(), '#savedMovies', true);
    })
    .catch(err => {
      console.error('Error in get all movies ', err);
    });
};

const getWatchedMoviesEvent = () => {
  firebaseApi.getWatchedMovies()
    .then(moviesArray => {
      dom.domString(moviesArray, tmdb.getImageConfig(), '#savedMovies', true);
    })
    .catch(err => {
      console.error('Error in get watched movies ', err);
    });
};

const getWishlistMoviesEvent = () => {
  firebaseApi.getWishlistMovies()
    .then(moviesArray => {
      dom.domString(moviesArray, tmdb.getImageConfig(), '#savedMovies', true);
    })
    .catch(err => {
      console.error('Error in get wishlist movies ', err);
    });
};

const deleteMovieFromFirebase = () => {
  $(document).on('click', '.deleteMovieFromCollectionEvent', e => {
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    firebaseApi.deleteMovieFromDb(movieToDeleteId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch(err => {
        console.error('Error deleting movie from HTML Document, ', err);
      });
  });
};

const updateMovieEvent = () => {
  $(document).on('click', '.updateMovieToWatched', e => {
    const movieToUpdateId = $(e.target).closest('.movie').data('firebaseId');
    const movieToUpdateCard = $(e.target).closest('.movie');
    const updatedMovie = {
      'title': movieToUpdateCard.find('.movie-title').text(),
      'overview': movieToUpdateCard.find('.movie-overview').text(),
      'poster_path': movieToUpdateCard.find('img').data('poster'),
      'rating': 0,
      'isWatched': true,
    };
    firebaseApi.updateMovieToWatchedInDb(updatedMovie, movieToUpdateId)
      .then(() => {
        // reprint/update DOM from firebase
        getAllMoviesEvent();
      })
      .catch(err => {
        console.error('Error updating movie database', err);
      });
  });
};

const filterEvents = () => {
  $('#filterButtons').on('click', e => {
    const classList = e.target.classList;
    if (classList.contains('show-wishlist')) {
      // wishlist only
      getWishlistMoviesEvent();
    } else if (classList.contains('show-watched')) {
      // watched only
      getWatchedMoviesEvent();
    } else {
      getAllMoviesEvent();
    }
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch(error => {
        const errorMessage = error.message;
        console.error(errorMessage);
        // ...
      });
  });

  $('#register-btn').click(() => {
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .catch(error => {
        const errorMessage = error.message;
        console.error(errorMessage);
        // ...
      });
  });

  $('#register-link').click(() => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#signin-link').click(() => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });

  $('#logout').click(() => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    })
      .catch(error => {
        console.error(error);
      });
  });
};

const initializer = () => {
  myLinks();
  pressEnter();
  saveMovieToWishListEvent();
  deleteMovieFromFirebase();
  updateMovieEvent();
  filterEvents();
  authEvents();
};

module.exports = {
  initializer,
  getAllMoviesEvent,
};
