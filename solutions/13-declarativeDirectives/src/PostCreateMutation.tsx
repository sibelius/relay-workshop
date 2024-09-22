import { graphql } from "react-relay";

/**
 * TODO
 * add mutation input and output here
 */
export const PostCreateMutation = graphql`
mutation PostCreateMutation($input: PostCreateInput! $connections: [ID!]!) {
        PostCreate(input: $input) {
            success,
            error,
            postEdge @appendEdge(connections: $connections) {
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
