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

module.exports = {
  myLinks,
};
