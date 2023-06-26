import { ILikeCommentRepository } from './like-comment-repository.interface'
import { IUnlikeCommentRepository } from './unlike-comment-repository.interface'

export interface IToggleLikeCommentRepository
  extends IUnlikeCommentRepository,
    ILikeCommentRepository {}
