import { PostDbModel } from './../../ports/repositories/models/post-model'

export interface ListOnePostServiceInterface {
  listOnePost: (id: string) => Promise<PostDbModel>
}
