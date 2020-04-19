import { useEffect } from 'react';
import { GraphQLSubscriptionConfig, requestSubscription } from 'relay-runtime';
import { useRelayEnvironment } from 'react-relay/hooks';

export const useSubscription = <TSubscriptionPayload extends object>(
  config: GraphQLSubscriptionConfig<TSubscriptionPayload>,
  requestSubscriptionFn?: typeof requestSubscription,
) => {
  // N.B. this will re-subscribe every render if config or requestSubscriptionFn
  // are not memoized.
  // Please do not pass an object defined in-line.
  const actualRequestSubscription = requestSubscriptionFn ?? requestSubscription;
  const environment = useRelayEnvironment();
  useEffect(() => {
    const { dispose } = requestSubscription(environment, config);
    return dispose;
  }, [environment, config, actualRequestSubscription]);
};
