# 02 - useLazyLoadQuery

Learn how to fetch GraphQL data with Relay

reading: https://relay.dev/docs/en/experimental/step-by-step

## Exercise

Fetch the following query inside your App component using Relay useLazyLoadQuery

```graphql
query {
    posts(first: 10) {
      edges {
        node {
          id
          content
        }
      }
    }          
}
```

## Extras

- [ ] handle error