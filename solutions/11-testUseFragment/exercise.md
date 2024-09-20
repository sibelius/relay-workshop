# 11 - test useFragment

Learn how to test components using useFragment and @relay_test_operation with @testing-library

## Exercise

- [x] try to render PostLikeButton component using @testing- [x]library
- [x] use `withProviders` helper to add all Providers for the component you want to test
- [x] create a Wrapper component that uses usePreloadQuery using @relay_test_operation directive
- [x] mock preloadQuery
- [x] call `preloadQuery` before rendering the component
- [x] assert post likes count

## Extras

- [x] add another test (it), testing when likesCount is zero and should not have any number in the DOM

## Code Helpers

- test operation
```graphql
query PostLikeButtonSpecQuery($id: ID!) @relay_test_operation {
  post: node(id: $id) {
    ...PostLikeButton_post
  }
}
```
