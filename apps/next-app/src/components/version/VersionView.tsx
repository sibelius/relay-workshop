import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { VersionViewQuery } from '__generated__/VersionViewQuery.graphql';
import { Flex } from 'rebass';

const VersionView = (props: {
  queryRef: PreloadedQuery<VersionViewQuery>;
}) => {
  const data = usePreloadedQuery(
    graphql`
      query VersionViewQuery {
        version
      }
    `,
    props.queryRef,
  );

  console.log({
    data,
  });

  return (
    <Flex flexDirection='column'>
      <span>Workshop</span>
      <span>Version: {data.version}</span>
    </Flex>
  );
}

export default VersionView;