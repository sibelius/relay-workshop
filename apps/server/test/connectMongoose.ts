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

export async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.connect(global.__MONGO_URI__, {
    connectTimeoutMS: 10000,
    dbName: global.__MONGO_DB_NAME__,
  });
}
