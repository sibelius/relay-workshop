import mongoose, { Document, Model, Types } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      description: 'User that liked.',
      required: true,
      index: true,
    },
    post: {
      type: ObjectId,
      ref: 'Post',
      index: true,
    },
    comment: {
      type: ObjectId,
      ref: 'Comment',
      index: true,
    },
  },
  {
    collection: 'Like',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export interface ILike extends Document {
  user: Types.ObjectId;
  post?: Types.ObjectId;
  comment?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LikeModel: Model<ILike> = mongoose.models['Like'] || mongoose.model('Like', Schema);

export default LikeModel;
