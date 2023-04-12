import { Pagination, mongoosePagination } from 'mongoose-paginate-ts'
import { UserProfileDBModel } from './../../../application/ports/repositories/models/user-profile-model'
import mongoose, { Document, Schema } from 'mongoose'

interface Profile
  extends Omit<UserProfileDBModel, 'id' | 'createdAt' | 'updatedAt'>,
    Document {}

const userProfileSchema = new Schema<Profile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    coverPhoto: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
)

userProfileSchema.plugin(mongoosePagination)
const UserProfileModel: Pagination<Profile> = mongoose.model<
  Profile,
  Pagination<Profile>
>('UserProfile', userProfileSchema)

export { UserProfileModel }
