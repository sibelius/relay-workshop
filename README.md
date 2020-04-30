# Relay Workshop

This is a workshop repo to teach you about Relay

## Structure

packages - contains packages and code that make workshop exercises possible
- babel - shared babel config
- babelweb - shared babel config for web with react fast refresh
- graphql - graphql utilities to make building graphql servers with graphql-js faster
- relay - relay utilities
- route - custom routing solution until react-router supports render as you fetch
- server - graphql server used on demo and workshop exercises
- test - test utilities to make tests easy
- ui - minit design system to be used on demo and workshop exercises
- web - demo app - mini social network
- webpack - shared webpack config for the demo and workshop exercises

workshop - a set of practice exercises to really learn Relay 
- 01-fetchGraphql - fetch GraphQL data using pure React
- 02-useLazyLoadQuery - fetch GraphQL data using Relay useLazyLoadQuery hook
- 03-useFragment - refactor code to colocate data using useFrament hook
- 04-usePagination - learn to paginate back and forward using usePagination hook
- 05-useMutation - learn to do mutation using useMutation hook
- 06-mutationUpdater - learn to update Relay store with mutation output data
- 07-useRefetchableFragment - use useRefetchableFragment to do some refetch queries and update data
- 08-useSubscription - learn how to useSubscription to make you app realtime
- 09-usePreloadQuery - learn the render as you fetch pattern using preloadQuery and usePreloadQuery
- 10-testUsePreloadQuery - learn how to test your Relay components using @testing-library
- 11-testUseFragment - learn how to test a single component with useFragment
- 12-testUseMutation - learn how to test mutations calls 

## How to update GraphQL schema SDL (schema.graphql)
```
yarn update-schema
```

## Server

```
yarn server
```

## How to update Relay artifacts
```
yarn relay
```

## Web

```
yarn web
```