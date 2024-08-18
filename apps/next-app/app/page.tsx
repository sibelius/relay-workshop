import loadSerializableQuery from '../src/relay/loadSerializableQuery';
import FeedViewQueryNode, { FeedViewQuery } from '../src/__generated__/FeedViewQuery.graphql';

import FeedViewClientComponent from './FeedViewClientComponent';

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<typeof FeedViewQueryNode, FeedViewQuery>(
    FeedViewQueryNode.params,
    {},
  );

  return (
    <>
      <FeedViewClientComponent preloadedQuery={preloadedQuery} />
    </>
  );
};

export default Page;

export const revalidate = 0;
