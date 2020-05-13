# Pagination using connections

Most apps have lists. 
A social network has a list of posts called newsfeed.
An ecommerce has a list of products.
These lists can be very big, so usually we don't fetch all the records at once.
We "paginate" over the list of records to get more from where we are.
There are 2 common types of paginations: offset based and connection based.

## Offset Based
Offset pagination uses 2 parameters to ask more items from a list, `skip` and `limit`.
Skip tells how many records to skip before selecting records.
Limit tells how many records to return.
A problem happens when a new record is added or removed from the list, 
the pagination will "lose" a record. 
You can only paginate from the begin or end of a page.

## Connection Based
```jsx
type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | undefined;
  endCursor: string | undefined;
};

type Edge<T> = {
  cursor: string;
  node: T;
};

type Connection<T> = {
  pageInfo: PageInfo;
  edges: Edge<T>[];
};
```
In a connection based pagination each record is represented by 2 values: `node` and `cursor`.
Node contains the value of the record, and the `cursor` contains the position of the record in the list.
A simple cursor implementation would have the `skip` value inside the cursor.
To check if you can paginate forward or backward you check pageInfo hasNextPage and hasPreviousPage.
You can paginate backward and forward from any node.

## Pagination in Relay
You going to need to define variables to be able to paginate. (first, after, before, last)
You also need to define a pagination query to be fetched when you want to load more items
To paginate using connection in Relay you are going to use `usePaginationRelay`. 

## Arguments in Fragments
Relay let you declare arguments per fragment definition using `@argumentDefinition` directive

```jsx
@argumentDefinitions(
  first: { type: Int, defaultValue: 1 }, 
  after: { type: String }
)
```

Relay compiler will convert this local arguments in global GraphQL variables,
as GraphQL does not support arguments at the fragment level.

## Pagination and Refetch Queries
To get more data after the first fetch, you need to define another query with the right arguments.
When using Relay hooks we can use a `@refetchable` directive to let relay compiler generate this Query for us.

```jsx
@refetchable(queryName: "FeedPaginationQuery")
```

```jsx
export function usePaginationFragment<
    TQuery extends OperationType,
    TKey extends KeyType
>(
    fragmentInput: GraphQLTaggedNode,
    fragmentRef: TKey | null,
): // tslint:disable-next-line no-unnecessary-generics
ReturnType<TQuery, TKey | null, $Call<KeyReturnType<TKey>> | null>;

export interface ReturnType<TQuery extends OperationType, TKey, TFragmentData> {
    data: TFragmentData;
    loadNext: LoadMoreFn;
    loadPrevious: LoadMoreFn;
    hasNext: boolean;
    hasPrevious: boolean;
    isLoadingNext: boolean;
    isLoadingPrevious: boolean;
    refetch: RefetchFnDynamic<TQuery, TKey>;
}
```

`usePaginationFragment` receives the fragment definition and also the fragmentRef.
The `fragmentRef` contains the data to be extracted by `usePaginationFragment`.
This hook returns:
- `data`: fragment data
- `loadNext` and `loadPrevious` to paginate forward and backward
- `hasNext` and `hasPrevious` to check whether you can paginate or not
- `isLoadingNext` and `isLoadingPrevious` to show loading information
- `refetch` to refetch the whole connection 

## References

- https://relay.dev/graphql/connections.htm
- https://dev.to/zth/connection-based-pagination-in-graphql-2588
- relay-compiler-repl.netlify.com  