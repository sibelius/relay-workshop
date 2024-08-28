# Testing mutations

Mutations usually happens when user interacts with you app.
We need to simulate the user interaction and 
assert the mutation are called with the right variables

## Mutation testing flow

````jsx
// render component
const { debug, getByText } = render(<Post />);

const mockResolvers = {
    Post: () => ({
      content: 'Welcome to Relay Workshop',
    }),
};
// resolve component query using a mock generator
// ComponentQuery
environment.mock.resolveMostRecentOperation(operation =>
  MockPayloadGenerator.generate(operation, customMockResolvers),
);

// get a like button
const likeButton = getByTestId('likeButton');
// click the button that will call the mutation
fireEvent.click(likeButton);
// wait the mutation to be called
await waitFor(() => environment.mock.getMostRecentOperation());

// get the mutation
// PostLikeMutation
const mutationOperation = environment.mock.getMostRecentOperation();

// expect the mutation are called with proper variables
expect(mutationOperation.fragment.variables.input).toEqual({
  post: postId,
});
````

## References

- https://relay.dev/docs/en/testing-relay-components
- https://legacy.reactjs.org/docs/test-utils.html
