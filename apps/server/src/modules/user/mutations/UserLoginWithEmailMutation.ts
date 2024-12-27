import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';

import { generateToken } from '../../../auth.ts';

import UserModel from '../UserModel.ts';

import * as UserLoader from '../UserLoader.ts';
import UserType from '../UserType.ts';
import { config } from '../../../config.ts';

export default mutationWithClientMutationId({
  name: 'UserLoginWithEmail',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email, password }, context) => {
    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });

    const defaultErrorMessage = 'Invalid credentials';
    if (!user) {
      return {
        error: defaultErrorMessage,
      };
    }

    const correctPassword = user.authenticate(password);

    if (!correctPassword) {
      return {
        error: defaultErrorMessage,
      };
    }

    const token = generateToken(user);

    context.setCookie(config.WORKSHOP_COOKIE, token);

    return {
      token: generateToken(user),
      id: user._id,
      success: 'Logged with success',
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
