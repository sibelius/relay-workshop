import { graphql } from 'graphql';

import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose, sanitizeTestObject } from '../../../test';
import { createUser } from '../../modules/user/fixture/createUser.ts';
import { schema } from '../schema.ts';
import { getContext } from '../../getContext.ts';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return logged user', async () => {
  const user = await createUser();

  // language=GraphQL
  const query = `
    query Q {
      me {
        name
      }
    }
  `;

  const rootValue = {};
  const contextValue = await getContext({ user });
  const variableValues = {};

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect(result.errors).toBeUndefined();
  expect(result.data.me).not.toBe(null);
  expect(result.data.me.name).toBe(user.name);
  expect(sanitizeTestObject(result)).toMatchSnapshot();
});
