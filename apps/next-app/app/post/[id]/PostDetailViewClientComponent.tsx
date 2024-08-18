'use client';

import { Suspense } from 'react';

import { RelayEnvironmentProvider } from 'react-relay';

import { SerializablePreloadedQuery } from '../../../src/relay/loadSerializableQuery';
import PostDetailViewQueryNode, { PostDetailViewQuery } from '../../../src/__generated__/PostDetailViewQuery.graphql';
import { getCurrentEnvironment } from '../../../src/relay/environment';
import useSerializablePreloadedQuery from '../../../src/relay/useSerializablePreloadedQuery';
import PostDetailView from '../../../src/components/post/PostDetailView';

const PostDetailViewClientComponent = (props: {
  preloadedQuery: SerializablePreloadedQuery<typeof PostDetailViewQueryNode, PostDetailViewQuery>;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef = useSerializablePreloadedQuery(environment, props.preloadedQuery);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback='Loading...'>
        <PostDetailView queryRef={queryRef} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default PostDetailViewClientComponent;
