const API_BASE_URL = "https://ample-gentleness-production-f104.up.railway.app";

const suggestBtn = document.getElementById("suggest-btn");

const moviePosterElement = document.getElementById("movie-poster");
const movieTitleElement = document.getElementById("movie-title");
const movieYearElement = document.getElementById("movie-year");
const movieRuntimeElement = document.getElementById("movie-runtime");
const movieGenresElement = document.getElementById("movie-genres");
const movieDescriptionElement = document.getElementById("movie-description");
const movieReleaseDateElement = document.getElementById("movie-release-date");
const movieRatingElement = document.getElementById("movie-rating");
const movieVotesElement = document.getElementById("movie-votes");

function formatRuntime(minutes) {
  if (!minutes && minutes !== 0) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatReleaseDate(dateValue) {
  if (!dateValue) return "Unknown";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderMovie(movie) {
  moviePosterElement.src = movie.poster || "";
  moviePosterElement.alt = movie.title || "movie poster";

  movieTitleElement.textContent = movie.title || "Untitled";
  movieYearElement.textContent = movie.year || "";
  movieRuntimeElement.textContent = formatRuntime(movie.runtime);
  movieGenresElement.textContent = (movie.genres || []).join(", ");

  movieDescriptionElement.textContent =
    movie.fullplot || movie.plot || "No description available.";

  movieReleaseDateElement.textContent = formatReleaseDate(movie.released);

  const rating = movie.imdb?.rating;
  const votes = movie.imdb?.votes;
  movieRatingElement.textContent = rating ? `${rating}/10` : "N/A";
  movieVotesElement.textContent = votes ? `(${votes.toLocaleString()} votes)` : "";
}

async function fetchMovieData(name) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get-movie?name=${encodeURIComponent(name)}`,
    );
    const result = await response.json();

    if (result.status !== 200 || !result.data) {
      console.error("Failed to fetch movie:", result.message);
      return;
    }

    renderMovie(result.data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

suggestBtn.addEventListener("click", () => {
  fetchMovieData("a");
});

fetchMovieData("a");
