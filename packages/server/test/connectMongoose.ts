import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
      __MONGO_DB_NAME__: string;
    }
  }
}

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

export async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.connect(global.__MONGO_URI__, {
    ...mongooseOptions,
    dbName: global.__MONGO_DB_NAME__,
  });
}
