import mongoose, { Document, Model, Types } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Post',
  },
);

export interface IPost extends Document {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostModel: Model<IPost> = mongoose.models['Post'] ||mongoose.model('Post', PostSchema);

export default PostModel;
