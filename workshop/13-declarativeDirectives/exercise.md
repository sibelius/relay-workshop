# 13 - declarativeDirectives

Learn how to use declarative directives to modify GraphQL data and see the connection updating automatically without the need to refresh or use a updater function.

## Exercise

- run `pnpm get-token` to get an user token, put the token on Authorization header on Network Layer
- Create a Post mutation using @appendEdge and @prependEdge to see the difference. 

## Extras

- [ ] add deletePostMutation using @deleteEdge

## Code Helpers

PostCreateMutation
```
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
```
