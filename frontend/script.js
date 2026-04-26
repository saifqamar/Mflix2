
const movieTitleElement = document.getElementById('movie-title');
const movieDescriptionElement = document.getElementById('movie-description');
const movieReleaseDateElement = document.getElementById('movie-release-date');
const movieRatingElement = document.getElementById('movie-rating');


async function fetchMovieData() {
    try {
        const response = await fetch('http://127.0.0.1:3000/get-movie?name=a');
        const movie = await response.json();
        console.log('Fetched movie data:', movie);
        movieTitleElement.textContent = movie.data.title;
        movieDescriptionElement.textContent = movie.data.description;
        movieReleaseDateElement.textContent = `Release Date: ${movie.data.released}`;
        movieRatingElement.textContent = `Rating: ${movie.data.imbd.rating}`;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }  
}

fetchMovieData();