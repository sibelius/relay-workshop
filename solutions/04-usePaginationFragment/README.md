# 04 - usePaginationFragment

Learn how to use usePaginationFragment to paginate a list of posts

## Exercise

- use usePaginationFragment on Feed.tsx component to fetch a list of posts and later on paginate it
- implement pagination on loadMore callback

## Extras

- [ ] use InfiniteScroll component

## Code Helpers

- usePagination query
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