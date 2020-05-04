import React from 'react';

import { Flex, Text } from 'rebass';
import { Card, Content } from '@workshop/ui';

const App = () => {
  const posts = {
    edges: [],
  };

  /**
   * @TODO
   * Fetch posts to be rendered in this component using `useLazyLoadQuery`
   */

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
