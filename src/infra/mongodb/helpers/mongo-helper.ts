import { Types } from 'mongoose'

export const MongoHelper = {
  mapToId(collection: any): any {
    const { _id, ...rest } = collection
    return { id: _id, ...rest }
  },

  idToObjectId(id: string): any {
    return new Types.ObjectId(id)
  },
}
