# Updating Relay Store

To learn how to update Relay Store, we first need to understand how Relay store is structured.

## Relay Store
Relay needs that each record have a Global ID.
A global id is an id that will uniquely identify the record even for different types.
Relay Store keeps all your GraphQL data as normalized records. 
Here is a `json` of a Relay Store:

```jsx
{
  "client:root": {
    "__id": "client:root",
    "__typename": "__Root",
    "me": {
      "__ref": "VXNlcjo1ZTNlMTdhZDdmNjVkMDVmZmI2NmUwNWQ="
    },
    "posts(first:3)": {
      "__ref": "client:root:posts(first:3)"
    },
    "__Feed_posts_connection": {
      "__ref": "client:root:__Feed_posts_connection"
    }
  },
  "VXNlcjo1ZTNlMTdhZDdmNjVkMDVmZmI2NmUwNWQ=": {
    "__id": "VXNlcjo1ZTNlMTdhZDdmNjVkMDVmZmI2NmUwNWQ=",
    "__typename": "User",
    "id": "VXNlcjo1ZTNlMTdhZDdmNjVkMDVmZmI2NmUwNWQ=",
    "name": "sibelius"
  },
  "client:root:posts(first:3)": {
    "__id": "client:root:posts(first:3)",
    "__typename": "PostConnection",
    "endCursorOffset": 3,
    "startCursorOffset": 0,
    "count": 49,
    "pageInfo": {
      "__ref": "client:root:posts(first:3):pageInfo"
    },
    "edges": {
      "__refs": [
        "client:root:posts(first:3):edges:0",
        "client:root:posts(first:3):edges:1",
        "client:root:posts(first:3):edges:2"
      ]
    }
  }, 
  "client:root:posts(first:3):edges:0": {
    "__id": "client:root:posts(first:3):edges:0",
    "__typename": "PostEdge",
    "node": {
      "__ref": "UG9zdDo1ZWEwMjNjNDJmMzk0NmRjOWQ3NGE0MGQ="
    },
    "cursor": "bW9uZ286MA=="
  },
  "UG9zdDo1ZWEwMjNjNDJmMzk0NmRjOWQ3NGE0MGQ=": {
    "__id": "UG9zdDo1ZWEwMjNjNDJmMzk0NmRjOWQ3NGE0MGQ=",
    "__typename": "Post",
    "id": "UG9zdDo1ZWEwMjNjNDJmMzk0NmRjOWQ3NGE0MGQ=",
    "content": "content#49",
    "author": {
      "__ref": "VXNlcjo1ZTljMmNiNDUyOTYyYjZjY2UwNzhjZjA="
    },
    "meHasLiked": false,
    "likesCount": 0,
    "comments(first:3)": {
      "__ref": "client:UG9zdDo1ZWEwMjNjNDJmMzk0NmRjOWQ3NGE0MGQ=:comments(first:3)"
    },
    "__PostComments_comments_connection": {
      "__ref": "client:UG9zdDo1ZWEwMjNjNDJmMzk0NmRjOWQ3NGE0MGQ=:__PostComments_comments_connection"
    }
  },  
}
```

`client:root` is a defined id by Relay to identify Query type
For global ids of this workshop we are using base64(typename, id)
If you decode `VXNlcjo1ZTNlMTdhZDdmNjVkMDVmZmI2NmUwNWQ=`, you are going to get
User:5e3e17ad7f65d05ffb66e05d
Each record will reference another using `__ref`, it is similar to Redux `normalizr`

## Connection at Relay Store
A connection is a "group" of edges, so Relay provides a special way to find and update connections to provide a better DX
You can use `@connection` directive to give a name for a given connection, 
so you can easily add and remove edges from it. 

## ConnectionHandler
ConnectionHandler is a helper that let you add and remove edges from connection 

- Get connection from name
```js
const connection = ConnectionHandler.getConnection(parentProxy, connectionName);
``` 

- Insert new edge to connection
```jsx
ConnectionHandler.insertEdgeBefore(connection, edge)
ConnectionHandler.insertEdgeAfter(connection, edge)
```

## When we need to use `updater`?
If you just edited a node and returned in your GraphQL mutation output field, Relay will update the store automatically.
However, when you create a new node or remove a node from a connection you need to provide an updater.
Relay cannot know from which connection you want to add the node, as you can have many connections of the same type. 

## References

- https://relay.dev/docs/en/mutations
- https://medium.com/@sibelius/relay-modern-the-relay-store-8984cd148798
- https://www.base64decode.org/  
- https://github.com/paularmstrong/normalizr
- https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape