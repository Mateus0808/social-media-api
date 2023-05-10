import { Pagination, mongoosePagination } from 'mongoose-paginate-ts'
import mongoose, { Document, Schema } from 'mongoose'
import { ImageDBModel } from '@application/ports/repositories/models/image-model'

interface Image
  extends Omit<ImageDBModel, 'id' | 'createdAt' | 'updatedAt'>,
    Document {}

const imageSchema = new Schema<Image>(
  {
    filename: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    key: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
)

imageSchema.plugin(mongoosePagination)
const ImageModel: Pagination<Image> = mongoose.model<Image, Pagination<Image>>(
  'UserProfile',
  imageSchema,
)

export { ImageModel }
