# Modifying data using Mutations

GraphQL mutations let you modify data in your GraphQL server.
A GraphQL mutation is a write followed by a read.

## GraphQL Mutation best practices

A GraphQL mutation is a write followed by a read.
Your graphql mutation should return all data that you need to update your client.

- if you added a new post, you should return the new post.
- If you edited a post, you should return the edited post.
- If you remove a post, you should return the id of the deleted post.

## GraphQL Relay Mutation pattern

Usually GraphQL Mutation in relay have a input object and also an output object, like below.
However this is not required anymore, feel free to use any mutation format you want.

```graphql
PostLike(input: PostLikeInput!): PostLikePayload

type PostLikePayload {
  post: Post
  error: String
  success: String
  clientMutationId: String
}

input PostLikeInput {
  post: ID!
  clientMutationId: String
}
```

## Doing mutations in Relay

Relay provides `useMutation` hook to perform mutations.
`useMutation` ensures that you won't do the same mutation twice
It will also cancel the mutation if the component is unmounted.

```jsx
type UseMutationConfig<TMutation extends MutationParameters> = {
  configs?: Array<DeclarativeMutationConfig>;
  onError?: (error: Error) => void | null;
  onCompleted?: (response: TMutation['response'], errors: Array<PayloadError> | null) => void | null;
  onUnsubscribe?: () => void | null;
  optimisticResponse?: any;
  optimisticUpdater?: SelectorStoreUpdater | null;
  updater?: SelectorStoreUpdater | null;
  uploadables?: UploadableMap;
  variables: TMutation['variables'];
};

export const useMutation = <TMutation extends MutationParameters>(
  mutation: GraphQLTaggedNode,
): [(config: UseMutationConfig<TMutation>) => Disposable, boolean]
```

`useMutation` receives a graphql`` tag with the GraphQL mutation

Example of a simple mutation in Relay
```jsx
const [postLike] = useMutation<PostLikeMutation>(PostLike);

const onPostLike = () => {
  const config = {
    variables: {
      input: {
        post: post.id,
      },
    },
  };  

  postLike(config);
}
``` 

Mutations can have optimistic response or updater to provide fast feedback for user.
An optimistic response is the "happy path", when everything goes well in the server.

## References

- https://relay.dev/docs/en/mutations
- https://github.com/graphql/graphql-relay-js  