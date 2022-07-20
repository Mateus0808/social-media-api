import { UserDbModel } from './../../application/ports/repositories/models/user-model';

export interface CommentEntity {
  user: string;
  comment: string;
  likes: Array<string>
}