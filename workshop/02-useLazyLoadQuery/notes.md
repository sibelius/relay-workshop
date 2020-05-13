# Fetching GraphQL Data using Relay

Relay let you declare which data each component will need to render.
Relay will fetch the data to you based on this declarations.

## Relay Archicture

Relay is composed by 3 parts:
- Relay Compiler: that will optimize your GraphQL fragments and queries.
- Relay Runtime: that will fetch and cache the data
- React Relay: that are Relay binding to React 

## Relay Experimental
react-relay package is Relay binding using higher order components
Relay experimental package is the new API using hooks, suspense and concurrent mode.
It is still experimental because it depends on React features that are experimental.
This workshop will focus only on the new APIs.  

## Setup
For the basic setup of relay you need an Environment.
An Environment has 2 parts: network layer and the store.
The network layer will tell Relay how to fetch a GraphQL operation (Query/Mutation/Subscription)
The store will tell Relay how to cache the data.

```jsx
const environment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
```

## Fetching data using useLazyLoadQuery
```jsx
type FetchPolicy = 'store-only' | 'store-or-network' | 'store-and-network' | 'network-only';
type RenderPolicy = 'full' | 'partial';
export function useLazyLoadQuery<TQuery extends OperationType>(
    gqlQuery: GraphQLTaggedNode,
    variables: TQuery['variables'],
    options?: {
        fetchKey?: string | number;
        fetchPolicy?: FetchPolicy;
        networkCacheConfig?: CacheConfig;
        renderPolicy_UNSTABLE?: RenderPolicy;
    },
): TQuery['response'];
```

useLazyLoadQuery receives a `gqlQuery` (a GraphQL query), `variables` (GraphQL variables), and `options`.
Options let you customize fetch behavior like fetch policy.
It will return the resolved query data, loading and error will be handled by Suspense and ErrorBoundary.
 
## References

- https://relay.dev/en/  
- https://relay.dev/docs/en/experimental/step-by-step