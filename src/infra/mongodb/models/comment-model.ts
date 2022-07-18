import mongoose, { Schema, Document } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { CommentDbModel } from '../../../application/ports/repositories/models/comment-model';

interface Comment extends Omit<CommentDbModel, 'id' | 'createdAt' | 'updatedAt'>, Document {}

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  totalLikes: {
    type: Number,
    default: 0
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

commentSchema.plugin(mongoosePagination)
const CommentModel: Pagination<Comment> = mongoose.model<Comment, Pagination<Comment>>('Comment', commentSchema)

export { CommentModel }