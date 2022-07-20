import { CommentDbModel } from "../../../ports/repositories/models/comment-model";

export interface CreateCommentParams {
  userId: string;
  postId: string;
  comment: string;
}

export interface CreateCommentResponse {
  id: string;
  user: string;
  comment: string;
  likes: Array<string>
  createdAt: Date;
}

export interface CreateCommentServiceInterface {
  createComment: (createCommentParams: CreateCommentParams) 
    => Promise<CreateCommentResponse>
}