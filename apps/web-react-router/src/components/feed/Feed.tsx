import React from 'react';
import { graphql , usePreloadedQuery, PreloadedQuery , useRelayEnvironment } from 'react-relay';


import { Content } from '@workshop/ui';

import { useLoaderData } from 'react-router-dom'

import PostComposer from './PostComposer';
import { FeedQuery } from './__generated__/FeedQuery.graphql';

import FeedList from './FeedList';
import { useNewPostSubscription } from './useNewPostSubscription';

type Props = {
  prepared: {
    feedQuery: PreloadedQuery<FeedQuery>;
  };
};
const Feed = ({ prepared }: Props) => {
  const loader = useLoaderData();

  console.log({
    loader,
  });

  const environment = useRelayEnvironment();

  const queryId = loader.feedQuery.params.id || loader.feedQuery.params.text;
  const params = loader.feedQuery.params;
  const variables = loader.feedQuery.variables;

  const feedQuery = {
    environment,
    fetchKey: queryId,
    fetchPolicy: 'store-or-network',
    isDisposed: false,
    name: params.name,
    kind: 'PreloadedQuery',
    variables,
  }

  console.log({
    feedQuery,
  });

  const data = usePreloadedQuery<FeedQuery>(
    graphql`
      query FeedQuery {
        ...FeedList_query
        me {
          id
          name
        }
      }
    `,
    feedQuery,
  );

  const { me } = data;

  // useNewPostSubscription(me);

  return (
    <Content>
      <PostComposer />
      <FeedList query={data} />
    </Content>
  );
};

export default Feed;
