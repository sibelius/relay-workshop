import { graphql } from 'graphql';

import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose, sanitizeTestObject } from '../../../../test';
import { createUser } from '../../user/fixture/createUser.ts';
import { schema } from '../../../schema/schema.ts';
import { getContext } from '../../../getContext.ts';
import { createPost } from '../fixture/createPost.ts';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should all posts', async () => {
  const user = await createUser();
  const anotherUser = await createUser();

  await createPost({
    author: user,
  });

  await createPost({
    author: anotherUser,
  });

  // language=GraphQL
  const query = `
    query Q {
      posts(first: 10) {
        edges {
          node {
            content
            author {
              name
            }
          }
        }
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

  // eslint-disable-next-line
  console.log('result: ', result.data.posts);
  expect(result.data.posts.edges.length).toBe(2);
  expect(sanitizeTestObject(result.data)).toMatchSnapshot();
});
