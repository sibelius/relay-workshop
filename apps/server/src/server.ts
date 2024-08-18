import { createServer } from 'http';

import { useServer } from 'graphql-ws/lib/use/ws';
import ws from 'ws';

import app from './app';
import { config } from './config';
import { connectDatabase } from './database';
import { schema } from './schema/schema';

(async () => {
  await connectDatabase();

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running on port :${config.PORT}`);
  });
  const graphqlWs = new ws.Server({ server });
  useServer({ schema }, graphqlWs);
})();
