import { FastifyInstance } from 'fastify';
import firefly from '../firefly';
import { ethers } from 'ethers'; 


export default async function identities(app: FastifyInstance) {
    app.post('/register_identitie', async (request, reply) => {
        interface Body {
          description?: string,
          name: string,
          // profile?: {
          //   additionalProp1: string,
          //   additionalProp2?: string,
          //   additionalProp3?: string
          // },
          type: 'node' | 'org',
          namespace: string,
          parent?: string
        }
    
        const body: Body = request.body as Body;
    
        const wallet = ethers.Wallet.createRandom();
        let key = wallet.address;
    
        try {
          
          let { name, description, type, namespace, parent} = body
          
          const params = {
            name: name,
            description: description,
            type: type,
            key: key,
            parent: parent,
            namespace: namespace
          }
    
          console.log(params); // Debug: verifique os parâmetros
          const reg_org = await firefly.createIdentity(params);
          
          reply.send(reg_org);
          
        } catch (error) {
          console.error("error: Erro ao criar Nova organização", error);
          // reply.status(500).send({ error: 'Erro ao criar Nova organização' }, error);
          reply.status(500).send(error);
        }
    
      })
    
    app.get('/identities', async (request, reply) => {

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