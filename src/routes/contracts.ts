import { FastifyInstance } from 'fastify';
import firefly from '../firefly';



export default async function contracts(app: FastifyInstance) {

    app.post('/deploy_contract', async (request, reply) => {
        interface Body {
          name: string,
          version: string,
          input: {
            abi: []
          }
    
        }
    
        const body: Body = request.body as Body;
    
        let { name, version, input: { abi } } = body
    
        try {
          const ffi = await firefly.generateContractInterface({
            name: name,
            version: version,
            input: {
              abi: abi
            }
          });
          
          const result = await firefly.createContractInterface(ffi, {publish: true});
    
          reply.send(result);
          
        } catch (error){
          console.error("error: Erro ao realizar deploy do contrato", error);
          reply.status(500).send(error);
        }
        // return { type: 'message', id: result.message };
    


    });

}