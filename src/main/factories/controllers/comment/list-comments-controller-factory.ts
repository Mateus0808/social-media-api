import { ListCommentsService } from "../../../../application/services/comment-serivces/list-comments-service"
import { CommentRepository } from "../../../../infra/mongodb/repositories/db-comment-repository"
import { ListCommentsController } from "../../../../presentation/controllers/comment/list-comments-controller"

export const makeListCommentsControllerFactory = () => {
  const commentRepository = new CommentRepository()
  const listCommentsService = new ListCommentsService(commentRepository)
  return new ListCommentsController(listCommentsService)
}