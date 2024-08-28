# 10 - test usePreloadedQuery

Learn how to test components using usePreloadedQuery with @testing-library

## Exercise

- [ ] Add test inside __tests__/PostDetail.spec.tsx
- [ ] try to render PostDetail component using @testing-library
- [ ] use `withProviders` helper to add all Providers for the component you want to test
- [ ] mock preloadQuery
- [ ] call `preloadQuery` before rendering the component
- [ ] assert post content

## Extras

- [ ] add another test (it), testing a post that was not found

## Code Helpers

- withProviders is used to add all Providers (styled-components, material-ui and other), to make tests as close to real usage
```jsx
const Root = withProviders({
    routes,
    initialEntries,
    Component: PostDetail,
});
```

- queue a pending operation, usually a query that will be used by preloadQuery
```jsx
environment.mock.queuePendingOperation(query, variables);
```

- mock a queued pending operation using custom mock resolvers
```jsx
environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers));
```

- mock GraphQL data
```jsx
const customMockResolvers = {
  User: () => ({
    name: 'Relay',
  }),
};
```