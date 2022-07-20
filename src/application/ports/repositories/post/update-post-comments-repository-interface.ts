import { CommentDbModel } from "../models/comment-model";
import { PostDbModel } from "../models/post-model";

export interface UpdatePostCommentsRepositoryParams {
  postId: string;
  commentId: string;
}

export interface UpdatePostCommentsRepositoryResponse extends CommentDbModel {}

export interface UpdatePostCommentsRepositoryInterface {
  updatePostComments: (updatePostCommentsParams: UpdatePostCommentsRepositoryParams)
   => Promise<UpdatePostCommentsRepositoryResponse | null>;
}