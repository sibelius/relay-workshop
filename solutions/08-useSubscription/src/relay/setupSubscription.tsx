import { createClient } from 'graphql-ws';
import { Observable, RequestParameters, Variables } from 'relay-runtime';

import config from '../config.tsx';

import { getToken } from './getToken.tsx';

export const setupSubscription = (request: RequestParameters, variables: Variables) => {
  const query = request.text;
  const authorization = getToken();

  const connectionParams = { authorization: '' };
  if (authorization) {
    connectionParams['authorization'] = authorization;
  }

  const subscriptionClient = createClient({
    url: config.SUBSCRIPTION_URL!,
    connectionParams: () => {
      if (!authorization) {
        return {};
      }
      return {
        Authorization: `Bearer ${authorization}`,
      };
    },
  });

  return Observable.create(sink => {
    if (!request.text) {
      return sink.error(new Error('Operation text cannot be empty'));
    }
    return subscriptionClient.subscribe(
      {
        operationName: request.name,
        query: query!,
        variables,
      },
      sink,
    );
  });
};
