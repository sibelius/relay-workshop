import { readFragment } from 'relay-runtime/lib/store/ResolverFragments';
import { graphql } from 'react-relay';
import moment from 'moment';

import { postCreatedAtDateResolver$key } from '../../__generated__/postCreatedAtDateResolver.graphql';

/**
 * @RelayResolver Post.createdAtDate: String
 * @rootFragment postCreatedAtDateResolver
 */
export function createdAtDate(key: postCreatedAtDateResolver$key) {
  const post = readFragment(
    graphql`
      fragment postCreatedAtDateResolver on Post {
        id
        createdAt
      }
    `,
    key,
  );

  return moment(post.createdAt).format('YYYY-MM-DD');
}
