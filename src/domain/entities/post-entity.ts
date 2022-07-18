import { CommentDbModel } from './../../application/ports/repositories/models/comment-model';
import { UserDbModel } from './../../application/ports/repositories/models/user-model';

export interface PostEntity {
  user: UserDbModel;
  title: string;
  content: string;
  totalLikes: number;
  comment: CommentDbModel[]
}