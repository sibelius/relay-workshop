import { Model } from 'mongoose';

// TODO - investigate this
// export const getOrCreate = async <T extends Document>(model: Model<T>, createFn: Function) => {
export const getOrCreate = async (model: Model<any>, createFn: () => any) => {
  const data = await model.findOne().lean();

  if (data) {
    return data;
  }

  return createFn();
};
