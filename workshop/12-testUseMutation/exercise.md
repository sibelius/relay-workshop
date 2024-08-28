# 12 - test useMutation

Learn how to test useMutation components

## Exercise
 
- [ ] render PostLikeButton component using @testing-library (same as 11-testUseFragment exercise)
- [ ] click on the like button
- [ ] assert the mutation is called with the right variables

## Extras

- [ ] mock mutation response and assert the new likesCount in the DOM

## Code Helpers

- click a button
```jsx
fireEvent.click(likeButton);
```

- wait mutation to be called
```jsx
await waitFor(() => environment.mock.getMostRecentOperation());
```

- get mutation operation
```jsx
const mutationOperation = environment.mock.getMostRecentOperation();
```

### tricks for extra exercise
Don't try to use the mock mutation response together with an `act` function asynchronous, the mutation response must be synchronous.
