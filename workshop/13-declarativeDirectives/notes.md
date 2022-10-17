# Why use Declarative Directives

GraphQL mutations let you modify data in your GraphQL server.
After a mutation, you can update your frontend without the need to refresh it using Declarative Directives.

## What are Declarative Directives
Declarative Directive are used to add newly created records to your connection. 
They can replace the usage of an updater function on your mutation, with Declarative Directives Relay does that to you.

We have @appendNode/@prependNode and @appendEdge/@prependEdge to insert new records. The difference is how your backend returns the data after the mutation.
For example, if your mutation return is something like that: 
```graphql
  mutation AddTodoMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge {
        cursor
        node {
          id
          text
          completed
        }
      }
      
    }
  }
```
You should use @appendEdge. So your mutation would look like this:
```graphql
  mutation AddTodoMutation($input: AddTodoInput!, $connections: [ID!]!) {
    addTodo(input: $input) {
      todoEdge @appendEdge(connections: $connections){
        cursor
        node {
          id
          text
          completed
        }
      }
    }
  }
```

As you can see, when using Declarative Directives is necessary to declare your connection as well. So you need to get it from your query, on the exercise we already had this setup for you, 
take a look at Feed.tsx to see how it's done.


## References

- https://relay.dev/docs/guided-tour/list-data/updating-connections/
- https://relay.dev/docs/guided-tour/updating-data/