import { ApplicationError } from '../application-error'

export class CommentNotDeletedOnPostError extends ApplicationError {
  constructor() {
    super('Erro ao tentar deletar comentário do post')
    this.name = 'CommentNotDeletedOnPostError'
  }
}
