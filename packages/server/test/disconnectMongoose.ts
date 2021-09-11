import mongoose from 'mongoose';

export const disconnectMongoose = () => mongoose.disconnect();
