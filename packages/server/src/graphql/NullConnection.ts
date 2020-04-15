export type NullConnectionType = {
  edges: [];
  count: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string;
    startCursor: string;
  };
  startCursorOffset: number;
  endCursorOffset: number;
};

export const NullConnection: NullConnectionType = {
  edges: [],
  count: 0,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: '',
    startCursor: '',
  },
  startCursorOffset: 0,
  endCursorOffset: 0,
};
