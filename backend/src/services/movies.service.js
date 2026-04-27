import getMovie from "../data-access/movie.model.js";



async function getMovieService(movieName) {
    try {
        const movie = await getMovie(movieName)
        console.log('movie', movie)

        return {status: 200, data: movie}
    } catch (err) {
        return {status: 500, message: err.message}
    }
}


export default getMovieService;