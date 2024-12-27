import { SubscribeFunction, Observable, RequestParameters, Variables } from 'relay-runtime';
import { createClient } from 'graphql-ws'

import config from '../config.tsx';

import { getToken } from './getToken.tsx';

export const setupSubscription = () => {
  const authorization = getToken();

  const connectionParams = {};

  if (authorization) {
    connectionParams['authorization'] = authorization;
  }

  const wsClient = createClient({
    url: config.SUBSCRIPTION_URL,
    connectionParams,
  })

  const subscribe: SubscribeFunction = (operation: RequestParameters, variables: Variables) => {
    return Observable.create(sink => {
      return wsClient.subscribe({
        query: operation.text!,
        variables,
        operationName: operation.name,
      }, sink)
    })
  }
  
  return subscribe
};
