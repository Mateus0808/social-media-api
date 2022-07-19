import { LoadPostsRepositoryInterface, LoadPostsRepositoryParams, LoadPostsRepositoryResponse } from './../../../application/ports/repositories/post/load-posts-repository-interface';
import { PostDbModel } from './../../../application/ports/repositories/models/post-model';
import { CreatePostRepositoryInterface, CreatePostRepositoryParams } from "../../../application/ports/repositories/post/create-post-repository-interface";
import { PostModel } from '../models/post-model';
import { MongoHelper } from '../helpers/mongo-helper';
import { DeletePostRepositoryInterface } from '../../../application/ports/repositories/post/delete-post-repository-interface';

export class PostRepository implements CreatePostRepositoryInterface, LoadPostsRepositoryInterface,
DeletePostRepositoryInterface {
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

  async loadPosts (loadPostsRepositoryParams: LoadPostsRepositoryParams)
    : Promise<LoadPostsRepositoryResponse | null> {
    const { page, limit } = loadPostsRepositoryParams
    
    const posts = await PostModel.paginate({
      page: page ?? 1,
      limit: limit ?? 10
    })

    if (!posts) return null

    const { docs, ...restPostsProps } = posts
    const postsArray = docs.map(post => MongoHelper.mapToId(post))

    const response: LoadPostsRepositoryResponse = {
      posts: postsArray,
      pagination: { ...restPostsProps }
    }
    return response
  }

  async deletePost(id: string): Promise<boolean> {
    const postDeleted = await PostModel.findByIdAndDelete(id)

    if (!postDeleted) {
      return false
    }

    return true
  }
}