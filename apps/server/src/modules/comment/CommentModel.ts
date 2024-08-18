import mongoose, { Document, Model, Types } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      description: 'User that typed this comment',
      required: true,
      index: true,
    },
    post: {
      type: ObjectId,
      ref: 'Post',
      description: 'Post this comment is attached to',
      required: true,
      index: true,
    },
  },
  {
    collection: 'Comment',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export interface IComment extends Document {
  user: Types.ObjectId;
  post: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentModel: Model<IComment> = mongoose.models['Comment'] || mongoose.model('Comment', Schema);

export default CommentModel;
