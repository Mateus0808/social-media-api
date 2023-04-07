import { ApplicationError } from '../application-error'

export class CommentNotFoundError extends ApplicationError {
  constructor() {
    super('Comentário não encontrado')
    this.name = 'CommentNotFoundError'
  }
}
