import { ApplicationError } from '../application-error'

export class CommentNotBelongPostError extends ApplicationError {
  constructor() {
    super('Comentário não pertence a postagem')
    this.name = 'CommentNotBelongPostError'
  }
}
