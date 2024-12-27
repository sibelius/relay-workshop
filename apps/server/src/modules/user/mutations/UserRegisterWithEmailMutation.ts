import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';

import { generateToken } from '../../../auth.ts';

import UserModel from '../UserModel.ts';

import UserType from '../UserType.ts';
import * as UserLoader from '../UserLoader.ts';
import { config } from '../../../config.ts';

export default mutationWithClientMutationId({
  name: 'UserRegisterWithEmail',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, email, password }, context) => {
    const hasUser = (await UserModel.countDocuments({ email: email.trim().toLowerCase() })) > 0;

    if (hasUser) {
      return {
        error: 'Email already in use',
      };
    }

    const user = await new UserModel({
      name,
      email,
      password,
    }).save();

    const token = generateToken(user);

    context.setCookie(config.WORKSHOP_COOKIE, token);

    return {
      token,
      id: user._id,
      success: 'User registered with success',
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: async ({ id }, _, context) => {
        return await UserLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});
