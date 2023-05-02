import mongoose, { Document, Schema } from 'mongoose'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts'
import { PostDbModel } from '../../../application/ports/repositories/models/post-model'

interface Post
  extends Omit<PostDbModel, 'id' | 'createdAt' | 'updatedAt'>,
    Document {}

const postSchema = new Schema<Post>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
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
    shareCount: {
      type: Number,
      default: 0,
    },
    shareDescription: {
      type: String,
      default: '',
    },
    shareTitle: {
      type: String,
      default: '',
    },
    shareImage: {
      type: String,
      default: '',
    },
    shareUrl: {
      type: String,
      default: '',
    },
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
