import { ListPostsService } from '../../../../application/services/post-services/list-posts-service'
import { ListPostsController } from '../../../../presentation/controllers/post/list-posts-controller'
import { PostRepository } from '../../../../infra/mongodb/repositories/db-post-repository'
import { Controller } from '../../../../presentation/interfaces/controller'

export const makeListPostsControllerFactory = (): Controller => {
  const postRepository = new PostRepository()
  const listPostService = new ListPostsService(postRepository)
  return new ListPostsController(listPostService)
}
