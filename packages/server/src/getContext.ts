import { IUser } from './modules/user/UserModel';
import { getDataloaders } from './modules/loader/loaderRegister';
import { GraphQLContext } from './graphql/types';

type ContextVars = {
  user?: IUser | null;
};
export const getContext = async (ctx: ContextVars = {}) => {
  const context: GraphQLContext = {
    ...ctx,
  };

  const dataloaders = getDataloaders();

  return {
    req: {},
    dataloaders,
    ...context,
  };
};
