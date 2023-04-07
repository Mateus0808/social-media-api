import { CommentNotFoundError } from '../../errors/comment-errors/comment-not-found-error'
import { commentsToPaginationDto } from '../../helpers/comment-dto'
import { LoadCommentsRepositoryInterface } from '../../ports/repositories/comment/load-comments-repository-interface'
import {
  ListCommentsServiceInterface,
  ListCommentsServiceParams,
  ListCommentsServiceResponse,
} from '../../interfaces/comment-interface/list-comments-service-interface'
import { commentToRepository } from '../../helpers/comment-to-repository'

export class ListCommentsService implements ListCommentsServiceInterface {
  constructor(
    private readonly commentRepository: LoadCommentsRepositoryInterface,
  ) {}

  async listComments(
    listCommentsServiceParams: ListCommentsServiceParams,
  ): Promise<ListCommentsServiceResponse> {
    const { page, limit } = listCommentsServiceParams

    const param = commentToRepository({ page, limit })
    const comments = await this.commentRepository.listComments(param)

    if (!comments) {
      throw new CommentNotFoundError()
    }

    return commentsToPaginationDto(comments)
  }
}
