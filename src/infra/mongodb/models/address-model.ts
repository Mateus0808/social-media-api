import mongoose, { Document, Schema } from 'mongoose'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts'

type Address = Document

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
  },
})

addressSchema.plugin(mongoosePagination)
const AddressModel: Pagination<Address> = mongoose.model<
  Address,
  Pagination<Address>
>('Address', addressSchema)

export { AddressModel }
