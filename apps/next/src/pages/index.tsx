import type { GetServerSideProps, NextPage } from 'next';
import { graphql, usePreloadedQuery } from 'react-relay';
import { Content } from '@workshop/ui';
import React from 'react';

import { getPreloadedQuery } from '../relay/getPreloadedQuery.tsx';
import FeedList from '../components/feed/FeedList.tsx';
import RootLayout from '../components/feed/RootLayout.tsx';
import PostComposer from '../components/post/PostComposer.tsx';

const pagesIndexQuery = graphql`
  query pagesIndexQuery @preloadable {
    ...FeedList_query
    me {
      id
      name
    }
  }
`;

const Feed: NextPage = props => {
  const query = usePreloadedQuery<any>(pagesIndexQuery, props.queryRefs.pagesIndexQuery);

  // useNewPostSubscription(me);

  return (
    <RootLayout>
      <Content>
        <span>{query.me?.name}</span>
        <PostComposer />
        <FeedList query={query} />
      </Content>
    </RootLayout>
  );
};

export default Feed;

export async function getServerSideProps(ctx) {
  return {
    props: {
      preloadedQueries: {
        pagesIndexQuery: await getPreloadedQuery(pagesIndexQuery, {}, ctx),
      },
    },
  };
}
