import { NextComponentType, NextPageContext } from 'next';
import { Suspense, useMemo } from 'react';
import { useRelayEnvironment, RelayEnvironmentProvider } from 'react-relay';

import { createEnvironment } from './relayEnvironment.tsx';

export function ReactRelayContainer({ Component, props }: {Component: NextComponentType<NextPageContext, any, any>, props: any}) {
  const environment = useMemo(() => createEnvironment(), []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={null}>
        <Hyderate Component={Component} props={props} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

function Hyderate({ Component, props }: {Component: NextComponentType<NextPageContext, any, any>, props: any}) {
  const environment = useRelayEnvironment();

  const transformedProps = useMemo(() => {
    if (props == null) {
      return props;
    }
    const { preloadedQueries, ...otherProps } = props;
    if (preloadedQueries == null) {
      return props;
    }

    const queryRefs: any = {};
    for (const [queryName, { params, variables, response }] of Object.entries(
      preloadedQueries,
    ) as any) {
      const queryId = params.id || params.text;

      environment
        .getNetwork()
        // @ts-ignore - seems to be a private untyped api 🤷‍♂️
        .responseCache.set(queryId, variables, response);
      // TODO: create using a function exported from react-relay package
      queryRefs[queryName] = {
        environment,
        fetchKey: queryId,
        fetchPolicy: 'store-or-network',
        isDisposed: false,
        name: params.name,
        kind: 'PreloadedQuery',
        variables,
      };
    }

    return { ...otherProps, queryRefs };
  }, [props]);

  return <Component {...transformedProps} />;
}