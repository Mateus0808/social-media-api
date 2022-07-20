import { ApplicationError } from '../application-error'

export class CommentNotCreatedError extends ApplicationError {
  constructor (comment: string) {
    super(`Não foi possível criar o comentário ${comment}`)
    this.name = 'CommentNotCreatedError'
  }
}
