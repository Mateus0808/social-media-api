import { CommentsNotFoundError } from '../../errors/comment-errors/comment-not-found-error';
import { commentsToPaginationDto } from '../../helpers/comment-dto';
import { LoadCommentsRepositoryInterface } from '../../ports/repositories/comment/load-comments-repository-interface';
import { ListCommentsServiceInterface, ListCommentsServiceParams, ListCommentsServiceResponse } from './../../interfaces/comment-interface/list-comments-service-interface';

export class ListCommentsService implements ListCommentsServiceInterface {
  constructor(
    private readonly commentRepository: LoadCommentsRepositoryInterface
  ) {}

  async listComments (listCommentsServiceParams: ListCommentsServiceParams): Promise<ListCommentsServiceResponse> {
    const { page, limit } = listCommentsServiceParams;

    const comments = await this.commentRepository.listComments({
      page, limit
    });

    if(!comments) {
      throw new CommentsNotFoundError()
    }

    return commentsToPaginationDto(comments)
  }

}