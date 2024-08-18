import loadSerializableQuery from '../../../src/relay/loadSerializableQuery';
import PostDetailViewQueryNode, { PostDetailViewQuery } from '../../../src/__generated__/PostDetailViewQuery.graphql';

import PostDetailViewClientComponent from './PostDetailViewClientComponent';

const Page = async ({ params }: { params: { id: string } }) => {
  const preloadedQuery = await loadSerializableQuery<typeof PostDetailViewQueryNode, PostDetailViewQuery>(
    PostDetailViewQueryNode.params,
    {
      id: params.id,
    },
  );

  return (
    <>
      <PostDetailViewClientComponent preloadedQuery={preloadedQuery} />
    </>
  );
};

export default Page;

export const revalidate = 0;
