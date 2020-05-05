# 08 - useSubscription

Learn how to use useSubscription to listen for changes in your GraphQL server

## Exercise

- complete useNewPostSubscription hook to subscribe to new updates of new Posts

## Extras

- [ ] add updater to update store

## Code Helpers

- PostNewSubscription
```graphql
subscription PostNewSubscription($input: PostNewInput!) {
    PostNew(input: $input) {
      post {
        id
        content
        author {
          id
          name
        }
        meHasLiked
        likesCount
        ...PostComments_post
      }
    }
  }
```

- using @workshop/relay connectionUpdater helper to add an edge to a connection

```jsx
connectionUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: 'Feed_posts',
    edge: postEdge,
    before: true,
});
```