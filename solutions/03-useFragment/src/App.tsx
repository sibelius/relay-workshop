import React from 'react';

import { Flex, Text } from 'rebass';
import { Content } from '@workshop/ui';
import { useLazyLoadQuery, graphql } from 'react-relay';

import Post from './Post.tsx';

import { AppQuery } from './__generated__/AppQuery.graphql';

const App = () => {
  const response = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        posts(first: 10) {
          edges {
            node {
              id
              ...Post_post
            }
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'network-only',
    },
  );

  const { posts } = response;

  return (
    <Content>
      <Flex flexDirection='column'>
        <Text>Posts</Text>
        <Flex flexDirection='column'>
          {posts.edges.map(({ node }) => (
            <Post key={node.id} post={node} />
          ))}
        </Flex>
      </Flex>
    </Content>
  );
};

export default App;
