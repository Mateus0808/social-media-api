import { Document, Schema } from 'mongoose';
import { PostDbModel } from '../../../application/ports/repositories/models/post-model';

interface Post extends Omit<PostDbModel, 'id' | 'createdAt' | 'updatedAt'>, Document {}

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
})