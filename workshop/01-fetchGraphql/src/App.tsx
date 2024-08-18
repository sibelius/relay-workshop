import React from 'react';

import styled from 'styled-components'
import { Flex, Text } from 'rebass';
import { Content, Card, Button } from '@workshop/ui';

const App = () => {
  const posts = [];
  const error = false;

  /**
   * @TODO
   * Fetch posts to be rendered in this component
   */

  if (error) {
    return (
      <Content>
        <Text>Error: {error}</Text>
        <Button mt='10px'>retry</Button>
      </Content>
    );
  }

  return (
    <Content>
      <Flex flexDirection='column'>
        <Text>Posts</Text>
        <Flex flexDirection='column'>
          {posts.map(post => (
            <Card key={post.id} mt='10px' flexDirection='column' p='10px'>
              <Text>id: {post.id}</Text>
              <Text>content: {post.content}</Text>
            </Card>
          ))}
        </Flex>
      </Flex>
      <Button>Prev</Button>
      <Button>Next</Button>
    </Content>
  );
};

export default App;
