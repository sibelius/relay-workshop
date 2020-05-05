# 06 - mutation updater

Learn how to use updater to update your Relay Store without using a refetch query after a mutation

## Exercise

- add updater to PostCommentCreate mutation to update Relay Store properly

## Extras

- [ ] use optimistic updater to provide a fast feedback to user
- [ ] show comments count and update comments count using updater

## Code Helpers
- Get a record from Relay store using a global id
```js
const recordProxy = store.get(globalId);
```

- Query Type root id
```js
import { ROOT_ID } from 'relay-runtime'
```

- Get connection from name
```js
const connection = ConnectionHandler.getConnection(parentProxy, connectionName);
``` 

- Insert new edge to connection
```jsx
ConnectionHandler.insertEdgeBefore(connection, edge)
ConnectionHandler.insertEdgeAfter(connection, edge)
```

- Create new node in Relay store
```js
const node = store.create(id, typename);
```

- Set value of a node/record proxy
```
node.setValue(value, propertyName);
```

- Set value that is an object or another record proxy of a node/record proxy
```
node.setLinkedRecord(recordProxy, propertyName);
```