# Composing Data Components with useFragment

As your app gets more complex you are going to have more components consuming data from your GraphQL server.
You can use 3 approaches to handle this.

## use multiple `useLazyLoadQuery`
If you use many `useLazyLoadQuery` in your component tree
It will generate many requests to your server, making your app slow and causing a heavy load to your server.

## use a single `useLazyLoadQuery` and use prop drilling
You can have a single `useLazyLoadQuery` per route, and do prop drilling to other components.
This will generate a single request per route, but will keep all components tighly coupled.
If you change a data requirement of a component down in the tree, you going to modify more components and prop drilling.

```jsx
<Posts>
 <Post>
   <PostAuthor />
   <PostBody />
   <PostComments />
 </Post>
</Posts>
``` 

For instance, if you change `PostBody` component data requirement
You need to also modify Post and Posts components.

## use a single `useLazyLoadQuery` + `useFragment`

useFragment hook let you declare the component data requirements
If you change PostBody_post fragment, relay compiler will recompile the queries to include the changes. 

```jsx
const post = useFragment<PostBody_post$key>(
    graphql`
      fragment PostBody_post on Post {
        content
      }
    `,
    props.post,
    );
```

```jsx
export function useFragment<TKey extends KeyType>(
    fragmentInput: GraphQLTaggedNode,
    fragmentRef: TKey,
): $Call<KeyReturnType<TKey>>;
```

`useFragment` receives the fragment definition (fragmentInput), and also the fragmentRef.
The `fragmentRef` contains the data to be extracted by `useFragment`. 

## Data Masking
When using `useFragment`, the returned data from it will only contain what you asked for.
Even if some other component asks for author of the Post, PostBody will only see `content` of the post
This helps you avoid bugs.
 
## References

- https://relay.dev/en/  
- https://relay.dev/docs/en/experimental/thinking-in-relay#data-masking
- https://dev.to/zth/relay-the-graphql-client-that-wants-to-do-the-dirty-work-for-you-55kd