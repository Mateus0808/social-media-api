import { ApplicationError } from '../application-error'

export class PostNotCreatedError extends ApplicationError {
  constructor() {
    super('Não foi possível criar o post')
    this.name = 'PostNotCreatedError'
  }
}
