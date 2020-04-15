import { GraphQLSubscriptionConfig, requestSubscription } from 'relay-runtime';
import { useRelayEnvironment } from 'react-relay/hooks';
import { useEffect } from 'react';

export const useSubscription = <TSubscriptionPayload extends object>(
  config: GraphQLSubscriptionConfig<TSubscriptionPayload>,
) => {
  const environment = useRelayEnvironment();

  useEffect(() => {
    const disposable = requestSubscription<TSubscriptionPayload>(environment, config);

    return () => {
      disposable.dispose();
    };
  });
};
