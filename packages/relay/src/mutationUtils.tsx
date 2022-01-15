import { ConnectionHandler, RecordProxy, RecordSourceProxy } from 'relay-runtime';

type ConnectionUpdater = {
  store: RecordSourceProxy;
  parentId: string;
  connectionName: string;
  edge: RecordProxy;
  before?: boolean;
};

export function connectionUpdater({ store, parentId, connectionName, edge, before = false }: ConnectionUpdater) {
  if (edge) {
    if (!parentId) {
      // eslint-disable-next-line
      console.log('maybe you forgot to pass a parentId: ');
      return;
    }

    const parentProxy = store.get(parentId);

    if (!parentProxy) {
      // eslint-disable-next-line
      console.log(`Parent proxy not found for "${parentId}"`);
      return;
    }

    const conn = ConnectionHandler.getConnection(parentProxy, connectionName);
    if (!conn) {
      // eslint-disable-next-line
      console.log('maybe this connection is not in relay store: ', connectionName);
      return;
    }

    if (before) {
      ConnectionHandler.insertEdgeBefore(conn, edge);
    } else {
      ConnectionHandler.insertEdgeAfter(conn, edge);
    }
  }
}

type ConnectionDeleteEdgeUpdaterOptions = {
  parentId: string;
  connectionName: string;
  nodeId: string;
  store: RecordSourceProxy;
  filters?: object;
};

export function connectionDeleteEdgeUpdater({
  parentId,
  connectionName,
  nodeId,
  store,
}: ConnectionDeleteEdgeUpdaterOptions) {
  const parentProxy = store.get(parentId);

  if (!parentProxy) {
    // eslint-disable-next-line
    console.log(`Parent proxy not found for "${parentId}"`);
    return;
  }

  const conn = ConnectionHandler.getConnection(parentProxy, connectionName);

  if (!conn) {
    // eslint-disable-next-line
    console.warn(`Connection ${connectionName} not found on ${parentId}`);
    return;
  }

  ConnectionHandler.deleteNode(conn, nodeId);
}
