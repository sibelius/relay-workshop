import {
  Network,
  QueryResponseCache,
  RequestParameters,
  Variables,
  CacheConfig,
  Store,
  RecordSource,
  Environment,
} from 'relay-runtime';

const IS_SERVER = typeof window === typeof undefined;
const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results

export const networkFetch = async (params: RequestParameters, variables: Variables, headers = {}) => {
  const url = process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:3000/api/graphql';

  const response = await fetch(
    // TODO: figure out how not to use hardcoded hostname and port
    // TODO: consider bypassing api fetch and directly invoking graphql on server
    url,
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
};

export const responseCache: QueryResponseCache | null = IS_SERVER
  ? null
  : new QueryResponseCache({
      size: 100,
      ttl: CACHE_TTL,
    });

export function createNetwork() {
  async function fetchResponse(operation: RequestParameters, variables: Variables, cacheConfig: CacheConfig) {
    const { id, text } = operation;

    const queryID = id || text;

    const isQuery = operation.operationKind === 'query';
    const forceFetch = cacheConfig && cacheConfig.force;
    if (responseCache != null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(queryID, variables);
      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(operation, variables);
  }

  const network = Network.create(fetchResponse);
  return network;
}

function createEnvironment() {
  return new Environment({
    network: createNetwork(),
    store: new Store(RecordSource.create()),
    isServer: IS_SERVER,
  });
}

export const environment = createEnvironment();

export function getCurrentEnvironment() {
  if (IS_SERVER) {
    return createEnvironment();
  }

  return environment;
}
