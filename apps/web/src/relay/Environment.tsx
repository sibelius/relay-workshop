// import { installRelayDevTools } from 'relay-devtools';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import cacheHandler from './cacheHandler.tsx';
import { relayTransactionLogger } from './relayTransactionLogger.tsx';
import { setupSubscription } from './setupSubscription.tsx';

const __DEV__ = process.env.NODE_ENV === 'development';
// if (__DEV__) {
//   installRelayDevTools();
// }

const network = Network.create(cacheHandler, setupSubscription);

const env = new Environment({
  network,
  store: new Store(new RecordSource(), {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10,
  }),
  log: __DEV__ ? relayTransactionLogger : null,
});

if (__DEV__) {
  window.relayEnvironment = env;
  window.debugRelayStore = () => env.getStore().getSource().toJSON();
}

export default env;
