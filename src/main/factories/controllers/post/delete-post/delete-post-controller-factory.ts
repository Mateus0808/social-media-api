import { DeletePostService } from '../../../../../application/services/post-services/delete-post-service'
import { DeletePostController } from '../../../../../presentation/controllers/post/delete-post-controller'
import { PostRepository } from '../../../../../infra/mongodb/repositories/db-post-repository'
import { Controller } from '../../../../../presentation/interfaces/controller'
import { makeDeletePostValidator } from './delete-post-validator'

export const makeDeletePostControllerFactory = (): Controller => {
  const postRepository = new PostRepository()
  const deletePostService = new DeletePostService(postRepository)
  return new DeletePostController(deletePostService, makeDeletePostValidator())
}
