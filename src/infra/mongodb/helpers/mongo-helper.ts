export const MongoHelper = {
  mapToId(collection: any): any {
    const { _id, ...rest } = collection
    return { id: _id, ...rest }
  },
}
