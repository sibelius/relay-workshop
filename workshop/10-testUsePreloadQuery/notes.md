# Testing components with Relay

We are going to test our components using [Testing Library](https://testing-library.com/).
Testing Library let us test our code similar of how user interacts with it.
We are going to focus on unit testing and integration test.
Unit testing is when you test a single component.
Integration testing is when you test a group of components.

## How to test
We should render our components, 
assert the native nodes (DOM on web)
interact with native nodes
and assert the final native nodes state is correctly

## Why not use a real GraphQL server
A real server would make your tests slow (they are async)
A real server would cause your tests to be flaky
A real server would make it hard to test all different scenarios
A real server would make it hard to make tests run in parallel

## Testing components that use Relay
Relay provides `relay-test-utils` package that will help us mocking Relay data in tests.
It provides `createMockEnvironment`, `MockPayloadGenerator` and `@relay_test_operation` directive.

### createMockEnvironment
`createMockEnvironment` create a test Environment that resolves GraphQL operations in a sync way
After rendering a component that needs a GraphQL operation you can mock the operation like this:

```jsx
environment.mock.resolveMostRecentOperation(operation =>
   MockPayloadGenerator.generate(operation, customMockResolvers),
);
```

`resolveMostRecentOperation` will resolve the most recent GraphQL operation.
The component will be rendered using the return data from this.

### MockPayloadGenerator
`MockPayloadGenerator` generates a mock operation based on some mock resolvers.
A mock resolver only needs to mock what is needed for the test scenario.
For instance, if you need a specific `Post` content, you can mock like this:
```jsx
const mockResolvers = {
    Post: () => ({
      content: 'Welcome to Relay Workshop',
    }),
};
```

### @relay_test_operation directive
@relay_test_operation is used to generate queries only used for tests.
This is useful when testing components that does not have query itself,
like fragment containers (useFragment, usePaginationFragment and useRefetchableFragment)   

```jsx
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
```

## Basic test flow
```jsx
// render component
const { debug, getByText } = render(<Post />);

const mockResolvers = {
    Post: () => ({
      content: 'Welcome to',
    }),
};
// resolve component query using a mock generator
// ComponentQuery
environment.mock.resolveMostRecentOperation(operation =>
  MockPayloadGenerator.generate(operation, customMockResolvers),
);

// assert DOM contains the component code
expect(getByText('Welcome to')).toBeTruthy();
```

### Testing preloadQuery code
When testing a `preloadQuery` code you need to mock and resolve an operation before calling `preloadQuery`

```jsx
// this will queue a pending operation to be resolved
environment.mock.queuePendingOperation(query, variables);

// this resolves the queue operation from above
environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers));
```

After doing this you can call your `preloadQuery`.
The `preloadQuery` flow is like this:

```jsx
// queue pending operation
environment.mock.queuePendingOperation(query, variables);

// PostDetailQuery
environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers));

// call preloadQuery
preloadQuery(Environment, PostDetailQuery, variables, {
  fetchPolicy: 'store-or-network',
})

// render component
const { debug, getByText } = render(<Post />);

// assert DOM contains the component code
expect(getByText('Welcome to')).toBeTruthy();
```

As you can see, you mock and resolve operation before calling `preloadQuery`

## References

- https://testing-library.com/docs/react-testing-library/intro
- https://relay.dev/docs/en/testing-relay-components
