import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode';
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes';

export const fetchGraphQL = async (request: RequestParameters, variables: Variables) => {
  const response = new Promise<{ data: { searchPosts: string[] } }>(resolve => {
    const { query } = variables;
    const timeout = query.length * 500;
    const data = { searchPosts: [...Array(10)].map((_, index) => `${query} result ${index}`) };
    setTimeout(() => {
      resolve({ data });
    }, timeout);
  });

  return response;
};

const network = Network.create(fetchGraphQL);

const env = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default env;
