# Relay Workshop GraphQL Server

GraphQL server used in Relay Workshop to show all Relay potential

Types available:
- User: that can login, create a new post, like and comment
- Post: describe a post from an user
- Comment: describe a comment from an user to a Post
- Like: describe a like in a post or comment

## How to update GraphQL schema SDL (schema.graphql)
```
pnpm update-schema
```

## How to run

```
pnpm start
```

## How to test
```
pnpm jest
```

## How to build

```
pnpm build
```