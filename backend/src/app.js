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
  origin: ["http://127.0.0.1:3000", "http://192.168.18.18:3000", "https://aesthetic-biscotti-4fe88a.netlify.app"],
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
