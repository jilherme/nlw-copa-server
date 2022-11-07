import { FastifyRequest } from "fastify";

// O plugin nao vai receber a instancia do fastify porque nao queremos criar rotas dentro dele,
// mas sim usá-lo ele como um middleware
export async function authenticate(request: FastifyRequest) {
  await request.jwtVerify();
}