# Testing a component that has no query

When testing a component that has no query, 
only `useFragment`/`usePaginationFragment`,`useRefetchableFragment`
You need to create a test Query to be able to mock and test them.

## Creating the wrapper test query
```jsx
export const getWrapper = ({ preloadedQuery }) => {
  const QueryWrapper = () => {
    const data = usePreloadedQuery<PostLikeButtonSpecQuery>(
      graphql`
        query PostLikeButtonSpecQuery($id: ID!) @relay_test_operation {
          post: node(id: $id) {
            ...PostLikeButton_post
          }
        }
      `,
      preloadedQuery,
    );

    return <PostLikeButton post={data.post} />;
  };
  
  return QueryWrapper;
};
```
We need to spread all fragments of the component to be tests inside the test Query
The rest is similar to test a component that has a query

## References

- https://relay.dev/docs/en/testing-relay-components