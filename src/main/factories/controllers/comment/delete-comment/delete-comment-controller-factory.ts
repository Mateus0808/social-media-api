import { DeleteCommentService } from '../../../../../application/services/comment-services/delete-comment-service'
import { CommentRepository } from '../../../../../infra/mongodb/repositories/db-comment-repository'
import { PostRepository } from '../../../../../infra/mongodb/repositories/db-post-repository'
import { DeleteCommentController } from '../../../../../presentation/controllers/comment/delete-comment-controller'
import { makeDeleteCommentValidator } from './delete-comment-validator'

export const makeDeleteCommentControllerFactory = () => {
  const postRepository = new PostRepository()
  const commentRepository = new CommentRepository()
  const deleteCommentService = new DeleteCommentService(
    postRepository,
    commentRepository,
    commentRepository,
  )
  return new DeleteCommentController(
    deleteCommentService,
    makeDeleteCommentValidator(),
  )
}
