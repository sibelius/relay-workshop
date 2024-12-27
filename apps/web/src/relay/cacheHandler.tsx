import { QueryResponseCache, FetchFunction } from 'relay-runtime';

import fetchQuery from './fetchQuery.tsx';
import { isMutation, isQuery, forceFetch } from './helpers.tsx';

const oneMinute = 60 * 1000;
const queryResponseCache = new QueryResponseCache({ size: 250, ttl: oneMinute });

const cacheHandler: FetchFunction = async (request, variables, cacheConfig, uploadables) => {
  const queryID = request.text;

  if (isMutation(request)) {
    queryResponseCache.clear();
    return fetchQuery(request, variables, uploadables);
  }

  const fromCache = queryResponseCache.get(queryID, variables);
  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    return fromCache;
  }

  const fromServer = await fetchQuery(request, variables, uploadables);
  if (fromServer) {
    queryResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};

export default cacheHandler;
