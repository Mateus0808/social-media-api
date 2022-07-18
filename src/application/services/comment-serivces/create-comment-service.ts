import { CommentNotCreatedError } from '../../errors/comment-errors/comment-not-created-error';
import { commentCreatedDto } from '../../helpers/comment-dto';
import { CreateCommentRepositoryInterface } from '../../ports/repositories/comment/create-comment-repository-interface';
import { CreateCommentParams, CreateCommentResponse, CreateCommentServiceInterface } from './../../interfaces/comment-interface/create-comment-service-interface';

export class CreateCommentService implements CreateCommentServiceInterface {
  constructor(
    private readonly commentRepository: CreateCommentRepositoryInterface
  ) {}

  async createComment (createCommentParams: CreateCommentParams): Promise<CreateCommentResponse> {
    const { comment, userId, postId } = createCommentParams;

    const commentCreated = await this.commentRepository.createComment({
      comment, userId, postId
    });

    if (!commentCreated) {
      throw new CommentNotCreatedError(comment)
    }

    return commentCreatedDto(commentCreated)
  }
}