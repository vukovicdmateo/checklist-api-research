import { createServer } from 'node:http';
import { configuration } from './app/config.js';
import { app } from './app/index.js';

const { port } = configuration.server;

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
