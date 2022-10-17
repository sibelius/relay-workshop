import { graphql } from 'react-relay';

export const PostDelete = graphql`
  mutation PostDeleteMutation($input: PostDeleteInput! $connections: [ID!]!) {
    PostDelete(input: $input) {
      postId @deleteEdge(connections: $connections)
      error
      success
    } 
  }
`;

