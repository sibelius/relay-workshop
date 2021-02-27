import { useState, useRef, useCallback, useEffect } from 'react';
import { useRelayEnvironment } from 'react-relay';

import {
  GraphQLTaggedNode,
  Disposable,
  MutationParameters,
  PayloadError,
  DeclarativeMutationConfig,
  SelectorStoreUpdater,
  UploadableMap,
  commitMutation,
} from 'relay-runtime';

export type UseMutationConfig<TMutation extends MutationParameters> = {
  configs?: Array<DeclarativeMutationConfig>;
  onError?: (error: Error) => void | null;
  onCompleted?: (response: TMutation['response'], errors: Array<PayloadError> | null) => void | null;
  onUnsubscribe?: () => void | null;
  optimisticResponse?: any;
  optimisticUpdater?: SelectorStoreUpdater | null;
  updater?: SelectorStoreUpdater | null;
  uploadables?: UploadableMap;
  variables: TMutation['variables'];
};

export const useMutation = <TMutation extends MutationParameters>(
  mutation: GraphQLTaggedNode,
): [(config: UseMutationConfig<TMutation>) => Disposable, boolean] => {
  const environment = useRelayEnvironment();
  const [isPending, setPending] = useState<boolean>(false);
  const requestRef = useRef(null);
  const mountedRef = useRef(false);

  const execute = useCallback(
    (config: UseMutationConfig<TMutation> = { variables: {} }) => {
      if (requestRef.current != null) {
        return;
      }
      const request = commitMutation(environment, {
        ...config,
        onCompleted: response => {
          if (!mountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          config.onCompleted && config.onCompleted(response);
        },
        onError: error => {
          // eslint-disable-next-line
          console.error(error);
          if (!mountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          config.onError && config.onError(error);
        },
        mutation,
      });
      requestRef.current = request;
      setPending(true);
    },
    [mutation, environment],
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  return [execute, isPending];
};
