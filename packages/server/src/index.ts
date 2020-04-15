import { createServer } from 'http';

import { SubscriptionServer } from 'subscriptions-transport-ws';

import { execute, subscribe } from 'graphql';

import app from './app';
import { connectDatabase } from './database';
import { config } from './config';

import { schema } from './schema/schema';
import { getContext } from './getContext';
import { getUser } from './auth';

type ConnectionParams = {
  authorization?: string;
};
(async () => {
  await connectDatabase();

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    // eslint-disable-next-line
    console.log(`server running on port :${config.PORT}`);
  });

  SubscriptionServer.create(
    {
      onConnect: async (connectionParams: ConnectionParams) => {
        const { user } = await getUser(connectionParams?.authorization);

        return getContext({ user });
      },
      // eslint-disable-next-line
      onDisconnect: () => console.log('Client subscription disconnected!'),
      execute,
      subscribe,
      schema,
    },
    {
      server,
      path: '/subscriptions',
    },
  );
})();
