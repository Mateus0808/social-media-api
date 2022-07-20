import { PostsNotFoundError } from './../../errors/post-errors/post-not-found-error';
import { badRequest } from "../../../presentation/helpers/http-helper";
import { DeletePostServiceInterface, DeletePostServiceResponse } from "../../interfaces/post-interface/delete-post-service-interface";
import { DeletePostRepositoryInterface } from "../../ports/repositories/post/delete-post-repository-interface";

export class DeletePostService implements DeletePostServiceInterface {
  private readonly postRepository: DeletePostRepositoryInterface;

  constructor(postRepository: DeletePostRepositoryInterface) {
    this.postRepository = postRepository;
  }

  public async deletePost(id: string): Promise<DeletePostServiceResponse> {
    const postDeleted = await this.postRepository.deletePost(id);

    if (!postDeleted) {
      throw new PostsNotFoundError();
    }

    return { 
      message: 'Post deletado com sucesso',
      success: true
    }
  }
}