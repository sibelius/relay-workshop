import React, { useEffect, useState } from 'react';

import { Flex, Text } from 'rebass';
import { Card, Content } from '@workshop/ui';

import { fetchGraphQL } from './fetchGraphQL';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchGraphQL(
        `
        query PostQuery {
          posts(first: 10) {
            edges {
              node {
                id
                content
              }
            }
          }          
        }
      `,
        {},
      );

      setPosts(result.data.posts.edges.map(({ node }) => node));
    };

    fetch();
  }, []);

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
    </Content>
  );
};

export default App;
