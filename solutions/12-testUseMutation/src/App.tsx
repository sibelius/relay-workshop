import React from 'react';

import { Flex, Text } from 'rebass';
import { Content } from '@workshop/ui';
import { graphql, usePreloadedQuery } from 'react-relay';

import Feed from './Feed';

import { AppQuery } from './__generated__/AppQuery.graphql';

type Props = {
  prepared: {
    appQuery: any;
  };
};
const App = ({ prepared }: Props) => {
  const query = usePreloadedQuery<AppQuery>(
    graphql`
      query AppQuery {
        ...Feed_query
        me {
          id
        }
      }
    `,
    prepared.appQuery,
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
