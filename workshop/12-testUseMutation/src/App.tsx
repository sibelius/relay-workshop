import React from 'react';

// eslint-disable-next-line import/namespace
import { Flex, Text } from 'rebass';
import { Content } from '@workshop/ui';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
// eslint-disable-next-line import/namespace
import { useLoaderData } from 'react-router-dom';

import Feed from './Feed.tsx';

import { AppQuery } from './__generated__/AppQuery.graphql';

type LoaderData = {
  appQuery: PreloadedQuery<AppQuery>;
};

const App = () => {
  const loadedData = useLoaderData() as LoaderData

  const query = usePreloadedQuery<AppQuery>(
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
