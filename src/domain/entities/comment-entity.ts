import { UserDbModel } from './../../application/ports/repositories/models/user-model';

export interface CommentEntity {
  user: UserDbModel;
  post: string;
  comment: string;
  totalLikes: number;
}