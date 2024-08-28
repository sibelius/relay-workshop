# 11 - test useFragment

Learn how to test components using useFragment and @relay_test_operation with @testing-library

## Exercise

- [ ] try to render PostLikeButton component using @testing-library
- [ ] use `withProviders` helper to add all Providers for the component you want to test
- [ ] create a Wrapper component that uses usePreloadQuery using @relay_test_operation directive
- [ ] mock preloadQuery
- [ ] call `preloadQuery` before rendering the component
- [ ] assert post likes count

## Extras

- [] add another test (it), testing when likesCount is zero and should not have any number in the DOM

## Code Helpers

- test operation
```graphql
query PostLikeButtonSpecQuery($id: ID!) @relay_test_operation {
  post: node(id: $id) {
    ...PostLikeButton_post
  }
}
```
