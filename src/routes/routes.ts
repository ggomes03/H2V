import { FastifyInstance } from 'fastify';
import identities from './identites';
import contracts from './contracts';
import token from './token';

export default async function routes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const msg = "Inicial da API de TCC";
    reply.send(msg);
  });

  await identities(app);
  await contracts(app);
  await token(app);
}



