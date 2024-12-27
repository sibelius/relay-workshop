import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { fetchGraphQL } from './fetchGraphQL.tsx';
import { setupSubscription } from './setupSubscription.tsx';

const network = Network.create(fetchGraphQL, setupSubscription());

const env = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default env;
