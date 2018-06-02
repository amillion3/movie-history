const domString = (movieArray, imageConfig, whereToPrint, myCollectionMode = false) => {
  let output = '';
  // movieArray.results.forEach((movie, index) => {
  movieArray.forEach((movie, index) => {
    if (index % 3 === 0) {
      output += '<div class="row">';
    }
    output += `<div class="col-sm-6 col-md-4">`;
    output += `  <div class="thumbnail movie">`;
    if (myCollectionMode === true) {
      output += `<a class='btn deleteMovieFromCollectionEvent'>X</a>`;
    }
    output += `    <img data-poster='${movie.poster_path}' src="${imageConfig.base_url}w342/${movie.poster_path}" alt="Movie Poster">`;
    output += `    <div class="caption">`;
    output += `      <h3 class='movie-title'>${movie.original_title ? movie.original_title : movie.title}</h3>`;
    output += `      <p class='movie-overview'>${movie.overview}</p>`;
    if (!myCollectionMode) {
      output += `      <p><a class="btn btn-default addMovieToWishList" role="button">Wishlist</a></p>`;
    } else if (myCollectionMode && !movie.isWatched) { // on movie page & movie isnt watched
      output += `<p><a href="#" class="btn btn-primary updateMovieToWatched" role="button">I've Watched It</a></p>`;
    } else {
      output += `<p>I'm going to put star ratings here one day.</p>`;
    }
    output += `    </div>`;
    output += `  </div>`;
    output += `</div>`;
    if (index % 3 === 2) {
      output += '</div>';
    }
  });
  printToDom(whereToPrint, output);
};

const printToDom = (whereToPrint, input) => {
  $(`${whereToPrint}`).html(input);
};

module.exports = {
  domString,
};
