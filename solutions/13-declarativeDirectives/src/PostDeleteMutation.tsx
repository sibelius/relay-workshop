import { graphql } from 'relay-runtime'

export const PostDeleteMutation = graphql`
    mutation PostDeleteMutation($connections: [ID!]!, $input: PostDeleteInput!) {
        PostDelete(input: $input) {
            postId @deleteEdge(connections: $connections)
            error
            success
        }
    }
`