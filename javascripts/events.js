const tmdb = require('./tmdb');

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
    } else if (e.target.id === 'nav-search') {
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
      $('#authScreen').addClass('hide');
    }
  });
};

// const myLinks = () => {
//   $(document).click((e) => {
//     if (e.target.id === 'authenticate') {
//       $('#myMovies').addClass('hide');
//       $('#search').addClass('hide');
//       $('#authScreen').removeClass('hide');
//     } else if (e.target.id === 'mine') {
//       $('#myMovies').removeClass('hide');
//       $('#search').addClass('hide');
//       $('#authScreen').addClass('hide');
//     } else if (e.target.id === 'navSearch') {
//       $('#myMovies').addClass('hide');
//       $('#search').removeClass('hide');
//       $('#authScreen').addClass('hide');
//     }
//   });
// };

const pressEnter = () => {
  tmdb.showResults();
};

const initializer = () => {
  myLinks();
  pressEnter();
};

module.exports = {
  initializer,
};
