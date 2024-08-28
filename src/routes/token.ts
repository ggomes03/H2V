import { FastifyInstance } from 'fastify';

import firefly from '../firefly';

export default async function token(app: FastifyInstance) {
    app.post('/create_token_pool', async (request, reply) => {
        try {
          interface Body {
            name: string; 
            symbol: string;
            type: 'fungible' | 'nonfungible';
            config: {
              address?: string;
              blockNumber: string;
            };
          }
      
          const body: Body = request.body as Body;
      
          const { name, symbol, type, config: { address, blockNumber } } = body;
      
          const params = {
            name: name,  
            symbol: symbol,
            type: type,
            config: { 
              adress: address,
              blockNumber: blockNumber
            }
          };
      
          console.log(params); // Debug: verifique os parâmetros
          const pool = await firefly.createTokenPool(params, { publish: true });
          reply.send(pool);
          
        } catch (error) {
          console.error("Erro ao criar o pool de tokens:", error);
          reply.status(500).send({ error: 'Erro ao criar o pool de tokens' });
        }
      });

      app.post('/mint_token', async (request, reply) => {
        try {
          interface Body {
            pool: string,
            amount: string
          }
      
          const body: Body = request.body as Body;
      
          let { pool, amount } = body;
          amount = (BigInt(parseInt(amount)) * BigInt(1000000000000000000)).toString();
          const params = {
            pool: pool,
            amount: amount
          };
      
          console.log(params); // Debug: verifique os parâmetros
          const mint = await firefly.mintTokens(params);
          reply.send(mint);
          
        } catch (error) {
          console.error("Erro ao criar o pool de tokens:", error);
          reply.status(500).send({ error: 'Erro ao criar o pool de tokens' });
        }
      });


    
}