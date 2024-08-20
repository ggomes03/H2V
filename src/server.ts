import app from './app';
import routes from './routes';

const server = async () => {
  try {
    // Carregar as rotas antes de iniciar o servidor
    await routes(app);

    await app.listen({ 
      port: 3000, 
      host: '0.0.0.0'
    });

    console.log("servidor rodando em http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

server();
