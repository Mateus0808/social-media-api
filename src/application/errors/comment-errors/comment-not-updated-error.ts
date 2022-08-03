import { ApplicationError } from '../application-error'

export class CommentNotUpdatedError extends ApplicationError {
  constructor() {
    super('Erro ao atualizar comentário')
    this.name = 'CommentNotUpdatedError'
  }
}
