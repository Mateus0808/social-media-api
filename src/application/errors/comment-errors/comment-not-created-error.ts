import { ApplicationError } from '../application-error'

export class CommentNotCreatedError extends ApplicationError {
  constructor() {
    super('Não foi possível criar o comentário')
    this.name = 'CommentNotCreatedError'
  }
}
