# 12 - test useMutation

Learn how to test useMutation components

## Exercise
 
- [x] render PostLikeButton component using @testing-library (same as 11-testUseFragment exercise)
- [x] click on the like button
- [x] assert the mutation is called with the right variables

## Extras

- [x] mock mutation response and assert the new likesCount in the DOM

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

tricks for extra exercise:
Don't try use the mock mutation response together an `act` function asynchronous, the mutation response must be a synchonous.