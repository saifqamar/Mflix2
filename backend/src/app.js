import Fastify from "fastify";
import getMovieController from "./controllers/movie.controller.js";
import { createConnection } from "mongoose";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import getMovieService from "./services/movies.service.js";
dotenv.config();

// initialize app
const fastify = Fastify({
  logger: true,
});
// CI/CD test
// cors
fastify.register(cors, {
  origin: ["http://127.0.0.1:3000", "http://localhost:3000", "http://192.168.18.191:3000", "https://sensational-melba-0e8d8e.netlify.app", " http://192.168.18.192:3000 "],
});

// ============================================
// endpoints
// ============================================

fastify.get("/hello", (request, reply) => {
  const { name } = request.query;
  reply.send(`hello`);
});

fastify.get("/get-movie", async(request, reply) => {
   const {name} = request.query
    if (!name) {
        reply.send({status: 400, message: 'name is required'})
    }
    console.log(typeof name)
    if (typeof name === "string"){
        const data = await getMovieService(name)
        reply.send(data)
    }
});

fastify.get("/rating", (request, reply) => {
  reply.send("ratings ...");
});

// ============================================
// server
// ============================================

fastify.listen({ host: "0.0.0.0", port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
  }
  fastify.log.info(`server listening on ${address}`);
});
