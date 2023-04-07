import { ApplicationError } from '../application-error'

export class CommentNotDeletedError extends ApplicationError {
  constructor() {
    super('Erro ao excluir comentário')
    this.name = 'CommentNotDeletedError'
  }
}
