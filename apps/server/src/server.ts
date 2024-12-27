import { createServer } from 'http';

import { useServer } from 'graphql-ws/lib/use/ws';
import ws from 'ws';

import app from './app.ts';
import { config } from './config.ts';
import { connectDatabase } from './database.ts';
import { schema } from './schema/schema.ts';

(async () => {
  await connectDatabase();

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running on port :${config.PORT}`);
  });
  const graphqlWs = new ws.Server({ server });
  useServer({ schema }, graphqlWs);
})();
