import { PostDbModel } from './../../../application/ports/repositories/models/post-model';
import { CreatePostRepositoryInterface, CreatePostRepositoryParams } from "../../../application/ports/repositories/post/create-post-repository-interface";
import { PostModel } from '../models/post-model';
import { MongoHelper } from '../helpers/mongo-helper';

export class PostRepository implements CreatePostRepositoryInterface {
  async createPost (createPostRepositoryParams: CreatePostRepositoryParams): Promise<PostDbModel | null> {
    const { title, content, user } = createPostRepositoryParams;
    const postCreated = await PostModel.create({
      title, content, user
    })
    if (!postCreated) {
      return null
    }
    return MongoHelper.mapToId(postCreated.toObject())
  }
}