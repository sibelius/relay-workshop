import React from 'react';

import { Flex, Text } from 'rebass';
import { Card, Content } from '@workshop/ui';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';

import { AppQuery } from './__generated__/AppQuery.graphql';

const App = () => {
  const response = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery ($first: Int) {
        posts(first: $first) {
          edges {
            node {
              id
              content
            }
          }
        }
      }
    `,
    { first: 5 },
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
            <Card key={node.id} mt='10px' flexDirection='column' p='10px'>
              <Text>id: {node.id}</Text>
              <Text>content: {node.content}</Text>
            </Card>
          ))}
        </Flex>
      </Flex>
    </Content>
  );
};

export default App;
