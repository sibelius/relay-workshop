# 07 - useRefetchableFragment

Learn how to use refetch any query using useRefetchableFragment

## Exercise

- modify PostComments to use useRefetchableFragment and a button to refetch old comments
- use useTransition hook to showing loading indicator is network is slow 

## Extras

- [ ] add a button to refetch new comments

## Code Helpers

- useTransition
useTransition hook let you "suspend" based on an action, usually a data fetch
```
const [isPending, startTransition] = useTransition();
```