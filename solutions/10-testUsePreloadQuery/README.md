# 10 - test usePreloadedQuery

Learn how to test components using usePreloadedQuery with @testing-library

## Exercise

- create a folder __tests__ besides PostDetail component 
- try to render PostDetail component using @testing-library
- use `withProviders` helper to add all Providers for the component you want to test
- mock preloadQuery
```jsx
// queue pending operation
Environment.mock.queuePendingOperation(query, variables);

// PostDetailQuery
Environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers));
```
- call `preloadQuery` before rendering the component
- assert post content

## Extras

- [ ] add another test (it), testing a post that was not found