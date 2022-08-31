// TODO - make this work
import { clearDbAndRestartCounters } from './clearDatabase';
import { connectMongoose } from './connectMongoose';
import { disconnectMongoose } from './disconnectMongoose';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);
