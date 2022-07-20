import { ApplicationError } from '../application-error'

export class PostsNotFoundError extends ApplicationError {
  constructor () {
    super('Posts não encontrados')
    this.name = 'PostsNotFoundError'
  }
}