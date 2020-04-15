import mongoose from 'mongoose';

import { IUser } from '../modules/user/UserModel';

declare type ObjectId = mongoose.Schema.Types.ObjectId;

export type GraphQLContext = {
  user?: IUser;
};

export type LoaderFn = (ctx: GraphQLContext, id: string | ObjectId | object) => any;
