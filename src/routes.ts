import { FastifyInstance } from 'fastify';
import FireFly from "@hyperledger/firefly-sdk";
import app from './app';


const credencials_ff = {
    host:   'http://localhost:5000',
    namespace: 'default'
}
const firefly = new FireFly(credencials_ff);

export default async function routes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const msg = "Inicial da API de TCC";
    reply.send(msg);
  });

  app.get('/identidades', async (request, reply) => {
    
    interface Query {
        did? : string,
        iid? : string
    }

    const query: Query = request.query as Query;

    const { did, iid } = query;

    const params = {
        did: did,
        iid: iid
    }
    
    const msg = await firefly.getIdentities( params );

    reply.send(msg);

  })

  

}


