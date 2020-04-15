import { ConnectionArguments } from 'graphql-relay';

type ArgsWithFilter = {
  filters: { [key: string]: string };
} & { [key: string]: string } & ConnectionArguments;
export const withFilter = (args: ArgsWithFilter, filters: object) => ({
  ...args,
  filters: {
    ...(args.filters || {}),
    ...filters,
  },
});
