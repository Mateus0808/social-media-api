import { CommentRepository } from './../../../../../infra/mongodb/repositories/db-comment-repository'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { PostRepository } from '../../../../../infra/mongodb/repositories/db-post-repository'
import { Controller } from '../../../../../presentation/interfaces/controller'
import { makeToggleLikeCommentValidator } from './toggle-like-comment.validator'
import { GetPostByIdService } from '@application/services/post-services/get-post-by-id.service'
import { GetUserByIdService } from '@application/services/user-services/get-user-by-id.service'
import { ToggleLikeCommentController } from '@presentation/controllers/comment/toggle-like-comment.controller'
import { ToggleLikeCommentService } from '@application/services/comment-services/toggle-like-comment.service'
import { GetCommentByIdService } from '@application/services/comment-services/get-comment-by-id-service'

export const makeToggleLikeCommentControllerFactory = (): Controller => {
  const postRepository = new PostRepository()
  const userRepository = new UserRepository()
  const commentRepository = new CommentRepository()

  const userService = new GetUserByIdService(userRepository)
  const postService = new GetPostByIdService(postRepository)
  const commentService = new GetCommentByIdService(commentRepository)

  const toggleLikeCommentService = new ToggleLikeCommentService(
    userService,
    postService,
    commentService,
    commentRepository,
  )

  return new ToggleLikeCommentController(
    toggleLikeCommentService,
    makeToggleLikeCommentValidator(),
  )
}
