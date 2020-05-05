import React from 'react';

import { Flex, Text } from 'rebass';
import { Content } from '@workshop/ui';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import Feed from './Feed';

import { AppQuery } from './__generated__/AppQuery.graphql';

type Props = {
  prepared: {
    appQuery: any;
  };
};
// eslint-disable-next-line
const App = ({ prepared }: Props) => {
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
