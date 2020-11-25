import React from 'react';

import { graphql } from 'react-relay/hooks';
import { Box, Flex, Text } from 'rebass';

import { Content, TextFieldMaterial } from '@workshop/ui';

/**
 * TODO: Create $searchPostsQuery.
 */
const searchPostsQuery = graphql``;

const Results = ({ queryReference }: { queryReference: any }) => {
  /**
   * TODO: Add usePreloadedQuery that takes $searchPostsQuery and $queryReference to
   * retrieve $searchPosts values.
   *
   * @see {@link https://relay.dev/docs/en/experimental/api-reference#usepreloadedquery|usepreloadedquery}
   */
  const searchPosts: string[] = [];

  return (
    <Flex backgroundColor='lightblue' width='100%' flexDirection='column' padding={3}>
      {searchPosts?.map(result => (
        <Text key={result} sx={{ marginBottom: 2 }}>
          {result}
        </Text>
      ))}
    </Flex>
  );
};

const App = () => {
  /**
   * TODO: use useQueryLoader to get the values of the variables below.
   *
   * You may want to use useEffect to perform loadQuery() every time that
   * query state changes.
   *
   * @see {@link https://relay.dev/docs/en/experimental/api-reference#usequeryloader|usequeryloader}
   */
  const [searchPostsQueryReference, loadQuery, disposeQuery] = [{}, '', () => null];

  const [query, setQuery] = React.useState('');

  return (
    <Content>
      <Box sx={{ position: 'relative' }}>
        <TextFieldMaterial
          fullWidth
          variant='outlined'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='What do you want to search?'
        />
        {searchPostsQueryReference && (
          <React.Suspense fallback={<Text>Suspense Loading...</Text>}>
            <Flex sx={{ position: 'absolute', width: '100%' }}>
              <Results queryReference={searchPostsQueryReference} />
            </Flex>
          </React.Suspense>
        )}
      </Box>
    </Content>
  );
};

export default App;
