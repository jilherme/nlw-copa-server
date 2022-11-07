import Fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt";

import { authRoutes, guessRoutes, poolRoutes, userRoutes } from "./routes";


// singleton -> pattern -> only one instance of prisma client
// nodejs reuses the same module if it's imported multiple times

async function bootstrap() {
  const fastify = Fastify({ logger: true })

  await fastify.register(cors, { origin: true})

  // Em production, usar variaveis de ambiente
  await fastify.register(jwt, { secret: "nlwcopa" })

  await fastify.register(poolRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(userRoutes)
  await fastify.register(authRoutes)

  await fastify.listen({ port: 3333, /* host: '0.0.0.0' */ })
}

bootstrap()