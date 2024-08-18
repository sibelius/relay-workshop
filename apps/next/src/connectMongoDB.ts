import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiHandler } from 'next/dist/shared/lib/utils';

const mongooseOptions = {
};

export const connectMongoDB =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!process.env.MONGO_URI) {
      console.warn('Unable to find mongo URI');
      return;
    }

    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGO_URI, mongooseOptions);

    return handler(req, res);
  };

export default connectMongoDB;
