import mongoose, { Document, Schema } from 'mongoose'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts'

import { UserDbModel } from '../../../application/ports/repositories/models/user-model'

interface User
  extends Omit<UserDbModel, 'id' | 'createdAt' | 'updatedAt'>,
    Document {}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile',
    },
    followers: [
      {
        type: String,
        default: [],
      },
    ],
    followings: [
      {
        type: String,
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ['ACTIVE', 'CLOSED', 'CANCELED', 'DISABLED'],
      default: 'ACTIVE',
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
)

userSchema.plugin(mongoosePagination)
const UserModel: Pagination<User> = mongoose.model<User, Pagination<User>>(
  'User',
  userSchema,
)

export { UserModel }
