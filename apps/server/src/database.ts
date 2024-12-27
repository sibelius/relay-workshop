import mongoose from 'mongoose';

import { config } from './config.ts';

export const connectDatabase = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  mongoose.connection.on('close', () => console.log('Database connection closed.'));

  await mongoose.connect(config.MONGO_URI);
};
