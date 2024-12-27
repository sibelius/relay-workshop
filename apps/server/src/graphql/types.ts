import mongoose from 'mongoose';

import { type DataLoaders } from '../modules/loader/loaderRegister';
import { type IUser } from '../modules/user/UserModel';

declare type ObjectId = mongoose.Schema.Types.ObjectId;

export type GraphQLContext = {
  user?: IUser;
  dataloaders: DataLoaders;
};

export type LoaderFn = (ctx: GraphQLContext, id: string | ObjectId | object) => any;
