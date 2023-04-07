import { ApplicationError } from '../application-error'

export class PostNotFoundError extends ApplicationError {
  constructor() {
    super('Post não encontrado')
    this.name = 'PostNotFoundError'
  }
}
