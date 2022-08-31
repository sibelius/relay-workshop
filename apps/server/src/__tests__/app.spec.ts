import request from 'supertest';

import app from '../app';
import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '../../test';
import { generateToken } from '../auth';
import { createUser } from '../modules/user/fixture/createUser';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return 200 and return logged user', async () => {
  const user = await createUser();

  const token = generateToken(user);

  // language=GraphQL
  const query = `
    query Q {
      me {
        name
      }      
    }
  `;

  const variables = {};

  const payload = {
    query,
    variables,
  };

  const response = await request(app.callback())
    .post('/graphql')
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    })
    .send(JSON.stringify(payload));

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
