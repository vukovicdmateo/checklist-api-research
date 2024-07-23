import { createServer } from 'node:http';
import { configuration } from './app/config.js';
import { app } from './app/index.js';
import { connect } from './app/database.js';

const { port } = configuration.server;

connect();

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
