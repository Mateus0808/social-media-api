import { CreatePostResponse } from './../interfaces/post-interface/create-post-service-interface';
import { PostDbModel } from "../ports/repositories/models/post-model";

export const postCreatedDto = (postCreated: PostDbModel): CreatePostResponse => ({
  id: postCreated.id,
  title: postCreated.title,
  user: postCreated.user,
  content: postCreated.content,
  totalLikes: postCreated.totalLikes,
  comment: postCreated.comment,
  createdAt: new Date(postCreated.createdAt)
})