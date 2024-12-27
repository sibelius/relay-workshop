'use client';

import { Suspense } from 'react';

import { RelayEnvironmentProvider } from 'react-relay';

import VersionView from '../../src/components/version/VersionView';
import { type SerializablePreloadedQuery } from '../../src/relay/loadSerializableQuery';
import VersionViewQueryNode, { VersionViewQuery } from '../../src/__generated__/VersionViewQuery.graphql';
import { getCurrentEnvironment } from '../../src/relay/environment';


import useSerializablePreloadedQuery from '../../src/relay/useSerializablePreloadedQuery';

const VersionViewClientComponent = (props: {
  preloadedQuery: SerializablePreloadedQuery<typeof VersionViewQueryNode, VersionViewQuery>;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef = useSerializablePreloadedQuery(environment, props.preloadedQuery);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback='Loading...'>
        <VersionView queryRef={queryRef} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default VersionViewClientComponent;
