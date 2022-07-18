import { UserDbModel } from "../../ports/repositories/models/user-model";

export interface CreateCommentParams {
  userId: string;
  postId: string;
  comment: string;
}

export interface CreateCommentResponse {
  id: string;
  user: UserDbModel;
  post: string;
  comment: string;
  totalLikes: number;
  createdAt: Date;
}

export interface CreateCommentServiceInterface {
  createComment: (createCommentParams: CreateCommentParams) => Promise<CreateCommentResponse>
}