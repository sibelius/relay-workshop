import { graphql } from 'graphql';

import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose, sanitizeTestObject } from '../../../test';
import { createUser } from '../../modules/user/fixture/createUser';
import { schema } from '../schema';
import { getContext } from '../../getContext';

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
  const context = await getContext({ user });
  const variables = {};

  const result = await graphql(schema, query, rootValue, context, variables);
  expect(result.errors).toBeUndefined();

  expect(result.data.me).not.toBe(null);
  expect(result.data.me.name).toBe(user.name);
  expect(sanitizeTestObject(result)).toMatchSnapshot();
});
