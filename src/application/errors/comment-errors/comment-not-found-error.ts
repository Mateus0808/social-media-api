import { ApplicationError } from '../application-error'

export class CommentsNotFoundError extends ApplicationError {
  constructor() {
    super('Comentários não encontrados')
    this.name = 'CommentsNotFoundError'
  }
}
