import React from 'react';

import { Flex, Text } from 'rebass';
import { Content } from '@workshop/ui';
import { useLazyLoadQuery, graphql } from 'react-relay';

import Feed from './Feed';

import { AppQuery } from './__generated__/AppQuery.graphql';

const App = () => {
  const query = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        ...Feed_query
      }
    `,
  );

  return (
    <Content>
      <Flex flexDirection='column'>
        <Text>Posts</Text>
        <Feed query={query} />
      </Flex>
    </Content>
  );
};

export default App;
