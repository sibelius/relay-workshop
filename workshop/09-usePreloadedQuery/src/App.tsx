import React from 'react';

import { Flex, Text } from 'rebass';
import { Content } from '@workshop/ui';
import { graphql, useLazyLoadQuery } from 'react-relay';

import Feed from './Feed.tsx';

import { AppQuery } from './__generated__/AppQuery.graphql';

 
const App = () => {
  // get data preloaded in router v6
  const loadedData = {}
  
  /**
   * TODO
   * use usePreloadedQuery instead of useLazyLoadQuery
   */
  const query = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        ...Feed_query
        me {
          id
        }
      }
    `,
    loadedData.appQuery,
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
