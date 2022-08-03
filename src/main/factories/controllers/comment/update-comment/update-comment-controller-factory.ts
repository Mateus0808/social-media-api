import { makeUpdateCommentValidator } from './update-comment-validator'
import { UpdateCommentController } from '../../../../../presentation/controllers/comment/update-comment-controller'
import { CommentRepository } from '../../../../../infra/mongodb/repositories/db-comment-repository'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { UpdateCommentService } from '../../../../../application/services/post-services/comment-services/update-comment-service'

export const makeUpdateCommentControllerFactory = () => {
  const userRepository = new UserRepository()
  const commentRepository = new CommentRepository()
  const updateCommentService = new UpdateCommentService(
    commentRepository,
    userRepository,
  )
  return new UpdateCommentController(
    updateCommentService,
    makeUpdateCommentValidator(),
  )
}
