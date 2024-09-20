import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { fetchGraphQL } from './fetchGraphQL';
import { setupSubscription } from './setupSubscription';

const network = Network.create(fetchGraphQL, setupSubscription());

const env = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default env;
