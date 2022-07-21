import mongoose, { Document, Schema } from 'mongoose'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts'
import { PostDbModel } from '../../../application/ports/repositories/models/post-model'

interface Post
  extends Omit<PostDbModel, 'id' | 'createdAt' | 'updatedAt'>,
    Document {}

const postSchema = new Schema(
  {
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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
      },
    ],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
)

postSchema.plugin(mongoosePagination)
const PostModel: Pagination<Post> = mongoose.model<Post, Pagination<Post>>(
  'Post',
  postSchema,
)

export { PostModel }
