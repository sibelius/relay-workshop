# 13 - useQueryLoader

Learn how to use `userQueryLoader` + `usePreloadedQuery` to fetch data, in this case, a user search.

## Exercise

- add `useQueryLoader` inside `App` method on path `src/App.tsx`
- add `usePreloadedQuery` inside `Results` on path `src/App.tsx`
- write the query `searchPostsQuery`. On schema, the search query has this signature `searchPosts(query: String!): [String!]`

## Extras

### Debounce

You may add `useDebounce` to delay user's typing. Without debounce, every time the user type, a new request is made. Debounce is used to delay the requests to our server and perform the request when user finishes or stop typing.

### useTransition

The Relay Environment has a mocked resolver. The query result is an array with 10 string whose values is the value of the query plus the index of the result. Also, the promise is resolver after `query.length * 500 ms`. For instance, if the user type "home" in the search bar, `home` is the value of `query` that has length of 4, this way the resolver will take 2 seconds (2000 milliseconds to be resolved.)

It was created this way to allow us observe the effects of using and not using `unstable_useTransition`. If we don't use `unstable_useTransition`, every time the fetch is performed, `React.Suspense` is activated, displaying the fallback. If we use, the fallback is not used unless the response time is greater than the configured `timeoutMs`.

For instance, if we create:

```
const [startTransition] = React.unstable_useTransition({ timeoutMs: 1550 })
```

the fallback is not rendered if the user type a query whose length is `1`, `2`, or `3` because all responses will take less than `1550 ms` (`500`, `1000` and `1500` milliseconds respectively).
