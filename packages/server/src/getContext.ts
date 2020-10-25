import { Request } from 'koa';

import { IUser } from './modules/user/UserModel';
import { getDataloaders } from './modules/loader/loaderRegister';
import { GraphQLContext } from './graphql/types';

type ContextVars = {
  user?: IUser | null;
  req?: Request;
};

export const getContext = async (ctx: ContextVars) => {
  const dataloaders = getDataloaders();

  return {
    req: ctx.req,
    dataloaders,
    user: ctx.user,
  } as GraphQLContext;
};
