import { Network, QueryResponseCache, RequestParameters, Variables, CacheConfig } from 'relay-runtime';

const ONE_MINUTE_IN_MS = 60 * 1000;

export function createNetwork() {
  const responseCache = new QueryResponseCache({
    size: 100,
    ttl: ONE_MINUTE_IN_MS,
  });

  async function fetchResponse(operation: RequestParameters, variables: Variables, cacheConfig: CacheConfig) {
    const { id } = operation;

    const isQuery = operation.operationKind === 'query';
    const forceFetch = cacheConfig && cacheConfig.force;
    if (isQuery && !forceFetch) {
      const fromCache = responseCache.get(id, variables);
      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(id, variables);
  }

  const network = Network.create(fetchResponse);

  // @ts-ignore Private API Hackery? 🤷‍♂️
  network.responseCache = responseCache;
  return network;
}

export async function networkFetch(params: RequestParameters, variables: Variables) {
  const response = await fetch(
    // TODO: figure out how not to use hardcoded hostname and port
    // TODO: consider bypassing api fetch and directly invoking graphql on server
    process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:3000/api/graphql',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    },
  );

  return response.json();
}
