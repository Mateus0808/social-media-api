import { UserRepository } from './../../../../../infra/mongodb/repositories/db-user-repository'
import { ToggleLikePostController } from './../../../../../presentation/controllers/post/toggle-like-post.controller'
import { PostRepository } from '../../../../../infra/mongodb/repositories/db-post-repository'
import { Controller } from '../../../../../presentation/interfaces/controller'
import { makeToggleLikePostValidator } from './toggle-like-post.validator'
import { ToggleLikePostService } from '@application/services/post-services/toggle-like-post.service'
import { GetPostByIdService } from '@application/services/post-services/get-post-by-id.service'
import { GetUserByIdService } from '@application/services/user-services/get-user-by-id.service'

export const makeToggleLikePostControllerFactory = (): Controller => {
  const postRepository = new PostRepository()
  const userRepository = new UserRepository()

  const userService = new GetUserByIdService(userRepository)
  const postService = new GetPostByIdService(postRepository)

  const toggleLikePostService = new ToggleLikePostService(
    userService,
    postService,
    postRepository,
  )

  return new ToggleLikePostController(
    toggleLikePostService,
    makeToggleLikePostValidator(),
  )
}
