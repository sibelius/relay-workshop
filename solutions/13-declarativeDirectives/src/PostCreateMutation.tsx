import { graphql } from 'react-relay';

export const PostCreate = graphql`
  mutation PostCreateMutation($input: PostCreateInput! $connections: [ID!]!) {
    PostCreate (input: $input) {
      success
      error
      postEdge @appendEdge(connections: $connections){
        node {
          id
          content
          author {
            name
          }
        }
      }
    }
  }
`;

