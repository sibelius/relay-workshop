# Preloading your Data Fetching

Fetching on render can have many edges cases, and even more when moving to React Concurrent Mode.
As React could render more than once your components.
Fetching on render also does not provide the best user experience,
as you only start loading data after you loaded code.
To be able to move to `render-as-you-fetch` pattern we need to start fetching early.

## preloadQuery

```jsx
export function preloadQuery<TQuery extends OperationType, TEnvironmentProviderOptions = any>(
    environment: IEnvironment,
    preloadableRequest: PreloadableConcreteRequest<TQuery>,
    variables: TQuery['variables'],
    options?: PreloadOptions | null,
    environmentProviderOptions?: TEnvironmentProviderOptions | null,
): PreloadedQuery<TQuery, TEnvironmentProviderOptions>;
```

`preloadQuery` should not be called inside render.
It will fetch a query before rendering the component
It usually called when a route change

## usePreloadedQuery

```jsx
export function usePreloadedQuery<TQuery extends OperationType>(
    gqlQuery: GraphQLTaggedNode,
    preloadedQuery: PreloadedQuery<TQuery>,
): TQuery['response'];
```

`usePreloadedQuery` should be called in render
It receives a graphql query and also the return of a `preloadQuery` call

## References

- https://reactjs.org/docs/concurrent-mode-suspense.html
- https://relay.dev/docs/en/api-reference#usepreloadedquery
- https://relay.dev/docs/en/api-reference#preloadquery
- https://reactrouter.com/en/main/start/overview