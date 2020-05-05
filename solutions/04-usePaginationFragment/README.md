# 04 - usePaginationFragment

Learn how to use usePaginationFragment to paginate a list of posts

## Exercise

- use usePaginationFragment on Feed.tsx component to fetch a list of posts and later on paginate it
- implement pagination on loadMore callback

## Extras

- [ ] use InfiniteScroll component

## Code Helpers

- usePagination query
```graphql
fragment Feed_query on Query {
    posts(first: $first, after: $after) @connection(key: "Feed_posts", filters: []) {
      endCursorOffset
      startCursorOffset
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          ...Post_post
        }
      }
    }
}
```

- @arguments
Use @arguments to declare "local" arguments to your fragments.
```jsx 
@argumentDefinitions(
  first: { type: Int, defaultValue: 1 }, 
  after: { type: String }
)
```

- @refetchable
Use @refetchable to let Relay generate a refetch query for your pagination or refetch fragments

```jsx
@refetchable(queryName: "FeedPaginationQuery")
```

- infinite scroll usage
```jsx
<InfiniteScroll
  pageStart={0}
  loadMore={loadMore}
  hasMore={hasMOre}
  loader={<Loading />}
  useWindow
>
  {data.posts.edges.map(({ node }) => (
    <Post key={node.id} post={node} me={me} />
  ))}
</InfiniteScroll>
```