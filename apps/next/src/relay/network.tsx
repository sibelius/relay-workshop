import { Network, QueryResponseCache, RequestParameters, Variables, CacheConfig } from 'relay-runtime';

const ONE_MINUTE_IN_MS = 60 * 1000;

export function createNetwork() {
  const responseCache = new QueryResponseCache({
    size: 100,
    ttl: ONE_MINUTE_IN_MS,
  });

  async function fetchResponse(operation: RequestParameters, variables: Variables, cacheConfig: CacheConfig) {
    const { id, text } = operation;

    const queryID = id || text;

    const isQuery = operation.operationKind === 'query';
    const forceFetch = cacheConfig && cacheConfig.force;
    if (isQuery && !forceFetch) {
      const fromCache = responseCache.get(queryID, variables);
      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(operation, variables);
  }

  const network = Network.create(fetchResponse);

  // @ts-ignore Private API Hackery? 🤷‍♂️
  network.responseCache = responseCache;
  return network;
}

export async function networkFetch(params: RequestParameters, variables: Variables, headers = {}) {
  const response = await fetch(
    // TODO: figure out how not to use hardcoded hostname and port
    // TODO: consider bypassing api fetch and directly invoking graphql on server
    process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:3000/api/graphql',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        query: params.text,
        variables,
        operationName: params.name,
      }),
      // credentials: 'same-origin',
      credentials: 'include',
    },
  );

  return response.json();
}
