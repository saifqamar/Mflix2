import Fastify from "fastify";
import getMovieController from "./controllers/movie.controller.js";
import { createConnection } from "mongoose";
import dotenv from "dotenv";
import cors from "@fastify/cors";
dotenv.config();

// initialize app
const fastify = Fastify({
  logger: true,
});

// cors
fastify.register(cors, {
  origin: "*",
});

// ============================================
// endpoints
// ============================================

fastify.get("/hello", (request, reply) => {
  const { name } = request.query;
  reply.send(`hello ${name}`);
});

fastify.get("/get-movie", (request, reply) => {
  getMovieController(request, reply);
});

fastify.get("/get-movies", (request, reply) => {
  reply.send("hello world");
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
