# Listening to GraphQL event changes

`useSubscription` let you listen to GraphQL subscription,
provide feedback to user and update store in realtime 

```jsx
export interface GraphQLSubscriptionConfig<TSubscriptionPayload> {
    configs?: ReadonlyArray<DeclarativeMutationConfig>;
    subscription: GraphQLTaggedNode;
    variables: Variables;
    onCompleted?: () => void;
    onError?: (error: Error) => void;
    onNext?: (response: TSubscriptionPayload | null | undefined) => void;
    updater?: SelectorStoreUpdater<TSubscriptionPayload>;
}

export const useSubscription = <TSubscriptionPayload extends object>(
  config: GraphQLSubscriptionConfig<TSubscriptionPayload>,
  requestSubscriptionFn?: typeof requestSubscription,
) => void
```
The subscription config let you pass a GraphQL subscription and variables.
`onNext` is be called when the subscription get an new event, so you can provide feedback to user.
`updater` is be called for every event and it is used to update store in realtime

## References

- https://relay.dev/docs/en/subscriptions