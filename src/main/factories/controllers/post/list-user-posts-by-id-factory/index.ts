import { PostRepository } from './../../../../../infra/mongodb/repositories/db-post-repository'
import { ListUserPostsService } from '@application/services/post-services/list-user-posts-service-interface'
import { ListUserPostsByIdController } from '@presentation/controllers/post/list-user-posts-by-id-controller'
import { Controller } from '@presentation/interfaces/controller'
import { UserRepository } from 'infra/mongodb/repositories/db-user-repository'
import { makeListUserPostsValidator } from './list-user-posts-validator'

export const makeListUserPostsByIdControllerFactory = (): Controller => {
  const postRepository = new PostRepository()
  const userRepository = new UserRepository()
  const postService = new ListUserPostsService(postRepository, userRepository)

  return new ListUserPostsByIdController(
    postService,
    makeListUserPostsValidator(),
  )
}
