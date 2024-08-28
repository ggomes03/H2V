import dotenv from 'dotenv';
import app from './app';
import routes from './routes/routes';

dotenv.config();

async function server() {
  try {
    // Carregar as rotas antes de iniciar o servidor
    await routes(app);

    const host: string = process.env.HOST || 'localhost';
    const port: number = parseInt(process.env.PORT as string, 10) || 3000;

    await app.listen({
      host: host,
      port: port
    });

    console.log("servidor rodando em http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

server();
