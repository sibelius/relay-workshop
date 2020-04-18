# 01 - Fetch GraphQL

Learn how to fetch GraphQL data without Relay

## Exercise

Fetch the following query inside your App component using only React

```graphql
query PostQuery {
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
- [ ] handle retry
- [ ] handle pagination