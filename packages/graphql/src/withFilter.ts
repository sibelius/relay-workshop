import { ConnectionArguments } from 'graphql-relay';

export type ArgsWithFilter = ConnectionArguments & {
  filters: { [key: string]: string };
  [key: string]: any;
};

export const withFilter = (args: ArgsWithFilter | { [key: string]: any }, filters: object) => ({
  ...args,
  filters: {
    ...(args.filters || {}),
    ...filters,
  },
});
