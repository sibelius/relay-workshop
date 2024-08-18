import loadSerializableQuery from '../../src/relay/loadSerializableQuery';
import VersionViewQueryNode, { VersionViewQuery } from '../../src/__generated__/VersionViewQuery.graphql';

import VersionViewClientComponent from './VersionViewClientComponent';

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<typeof VersionViewQueryNode, VersionViewQuery>(
    VersionViewQueryNode.params,
    {},
  );

  return (
    <>
      <VersionViewClientComponent preloadedQuery={preloadedQuery} />
    </>
  );
};

export default Page;

export const revalidate = 0;
