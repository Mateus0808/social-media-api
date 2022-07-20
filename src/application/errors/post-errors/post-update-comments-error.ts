import { ApplicationError } from '../application-error'

export class PostUpdateCommentError extends ApplicationError {
  constructor () {
    super('Erro ao comentar no post')
    this.name = 'PostUpdateCommentError'
  }
}