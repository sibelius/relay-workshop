# Refetching Data

`useRefetchableFragment` can be seen as a generalization of `usePaginationFragment`
Instead of fetching only based on pagination, you can do arbiteraly refetches 

```jsx
export type ReturnType<TQuery extends OperationType, TKey extends { readonly ' $data'?: unknown | null }> = [
    $Call<NonNullableReturnType<TKey> & NullableReturnType<TKey>>,
    RefetchFnDynamic<TQuery, TKey>,
];

export function useRefetchableFragment<
    TQuery extends OperationType,
    TKey extends { readonly ' $data'?: unknown | null }
    // tslint:disable-next-line:no-unnecessary-generics
>(fragmentInput: GraphQLTaggedNode, fragmentRef: TKey): ReturnType<TQuery, TKey>;
```
`useRefetchableFragment` receives the fragment definition and also the fragmentRef.
The `fragmentRef` contains the data to be extracted by `useRefetchableFragment`. 

Usage example:

```jsx
const [post, refetch] = useRefetchableFragment(...)
```

`useRefetchableFragment` returns the fragment data and also `refetch` function.
The `refetch` function will refetch new data when you change GraphQL variables.

## References

- https://relay.dev/docs/en/mutations
- https://medium.com/@sibelius/relay-modern-the-relay-store-8984cd148798
- https://www.base64decode.org/  
- https://github.com/paularmstrong/normalizr
- https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape