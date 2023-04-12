import { PostRepository } from './../../../../../infra/mongodb/repositories/db-post-repository'
import { makeUpdateCommentValidator } from './update-comment-validator'
import { UpdateCommentController } from '../../../../../presentation/controllers/comment/update-comment-controller'
import { CommentRepository } from '../../../../../infra/mongodb/repositories/db-comment-repository'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { UpdateCommentService } from '../../../../../application/services/comment-services/update-comment-service'

export const makeUpdateCommentControllerFactory = () => {
  const userRepository = new UserRepository()
  const commentRepository = new CommentRepository()
  const postRepository = new PostRepository()
  const updateCommentService = new UpdateCommentService(
    commentRepository,
    userRepository,
    postRepository,
  )
  return new UpdateCommentController(
    updateCommentService,
    makeUpdateCommentValidator(),
  )
}
