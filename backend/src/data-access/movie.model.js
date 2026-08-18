import { createConnection } from "mongoose";
/*import mongoose from "mongoose";*/
import dotenv from "dotenv";
dotenv.config();

const db = createConnection(process.env.MONGODB_URI);
db.on("connected", () => {
  console.log("connected to mongodb");
});
db.on("error", (err) => {
  console.log("error connecting to mongodb", err);
});

async function getMovie(movieName) {
  if (!movieName) {
    throw new Error("movieName is required");
  }

  if (!db) {
    throw new Error("db connection is not established");
  }

  try {
    const movies_coll = db.collection("movies");
    // const movie = await movies_coll.findOne({title: movieName})
    const randomMovies = await movies_coll
      .aggregate([{ $sample: { size: 1 } }]);

    const randomMovie = randomMovies[0];
    console.log("movieName", movieName);
    return randomMovie;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default getMovie;
