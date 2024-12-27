import React, { useEffect, useState, useCallback } from 'react';

import { Flex, Text } from 'rebass';
import { Card, Content, Button } from '@workshop/ui';

import { fetchGraphQL } from './fetchGraphQL.tsx';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchQuery = useCallback(async () => {
    setError(null);
    try {
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
    } catch (err) {
      setError(err.toString());
    }
  }, [setError, setPosts]);

  useEffect(() => {
    fetchQuery();
  }, [fetchQuery]);

  if (error) {
    return (
      <Content>
        <Text>Error: {error}</Text>
        <Button mt='10px' onClick={fetchQuery}>
          retry
        </Button>
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
    </Content>
  );
};

export default App;
