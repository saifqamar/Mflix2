import getMovieService from "../services/movies.service.js";


async function getMovieController(req, res) {
    const {name} = req.query
    if (!name) {
        res.send({status: 400, message: 'name is required'})
    }
    console.log(typeof name)
    if (typeof name === "string"){
        const data = await getMovieService(name)
        res.send(data)

    }

}

export default getMovieController;