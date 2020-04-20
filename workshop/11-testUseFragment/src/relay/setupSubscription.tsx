import { SubscribeFunction, Observable } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import config from '../config';

import { getToken } from './getToken';

export const setupSubscription: SubscribeFunction = (request, variables) => {
  const query = request.text;

  const authorization = getToken();

  const connectionParams = {};

  if (authorization) {
    connectionParams['authorization'] = authorization;
  }

  const subscriptionClient = new SubscriptionClient(config.SUBSCRIPTION_URL, {
    reconnect: true,
    connectionParams,
  });

  const observable = subscriptionClient.request({ query: query!, variables });

  return Observable.from(observable);
};
