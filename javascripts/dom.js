const domString = (movieArray, imageConfig) => {
  let output = '';
  movieArray.results.forEach(movie => {
    output += `<div class="col-sm-6 col-md-4">`;
    output += `  <div class="thumbnail">`;
    output += `    <img src="${imageConfig.base_url}w342/${movie.poster_path}" alt="Movie Poster">`;
    output += `    <div class="caption">`;
    output += `      <h3>${movie.original_title}</h3>`;
    output += `      <p>${movie.overview}</p>`;
    output += `      <p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Wishlist</a></p>`;
    output += `    </div>`;
    output += `  </div>`;
    output += `</div>`;
  });
  printToDom(output);
};

const printToDom = input => {
  $('#movies').html(input);
};

module.exports = {
  domString,
};
