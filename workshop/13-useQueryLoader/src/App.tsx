import React from 'react';

import { graphql, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks';
import { Box, Flex, Text } from 'rebass';
import { useDebounce } from 'use-debounce';

import { Content, TextFieldMaterial } from '@workshop/ui';

import { AppSearchPostsQuery } from './__generated__/AppSearchPostsQuery.graphql';

const searchPostsQuery = graphql`
  query AppSearchPostsQuery($query: String!) {
    searchPosts(query: $query)
  }
`;

const Results = ({ queryReference }: { queryReference: any }) => {
  const { searchPosts } = usePreloadedQuery<AppSearchPostsQuery>(searchPostsQuery, queryReference);

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
  const [searchPostsQueryReference, loadQuery, disposeQuery] = useQueryLoader<AppSearchPostsQuery>(searchPostsQuery);

  const [query, setQuery] = React.useState('');
  const [debouncedQuery] = useDebounce(query, 1000);

  const [startTransition] = React.unstable_useTransition({ timeoutMs: 1550 } as any);

  React.useEffect(() => {
    if (debouncedQuery) {
      startTransition(() => {
        loadQuery({ query: debouncedQuery });
      });
    } else {
      disposeQuery();
    }
  }, [debouncedQuery]);

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
